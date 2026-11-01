from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, BeforeValidator
from typing import List, Optional, Annotated
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from datetime import datetime
import os
import httpx

from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration MongoDB
MONGO_DETAILS = os.getenv("MONGO_DETAILS")
DATABASE_NAME = os.getenv("DATABASE_NAME")
CONVERSATIONS_COLLECTION_NAME = os.getenv("CONVERSATIONS_COLLECTION_NAME")

if not MONGO_DETAILS:
    raise ValueError("MONGO_DETAILS environment variable not set.")
if not DATABASE_NAME:
    raise ValueError("DATABASE_NAME environment variable not set.")
if not CONVERSATIONS_COLLECTION_NAME:
    raise ValueError("CONVERSATIONS_COLLECTION_NAME environment variable not set.")

def validate_objectid(v: any) -> ObjectId:
    if isinstance(v, ObjectId):
        return v
    if not ObjectId.is_valid(v):
        raise ValueError("Invalid objectid")
    return ObjectId(v)

PyObjectId = Annotated[
    ObjectId,
    BeforeValidator(validate_objectid),
]


class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Conversation(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id", json_schema_extra={"type": "string"})
    messages: List[ChatMessage] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, datetime: lambda dt: dt.isoformat()}
        json_schema_extra = {
            "example": {
                "messages": [
                    {"role": "user", "content": "Bonjour !"},
                    {"role": "assistant", "content": "Salut ! Comment puis-je vous aider ?"}
                ]
            }
        }

class ChatRequest(BaseModel):
    prompt: str
    model: str = "llama3.2:3b"
    conversation_id: Optional[str] = None

@app.on_event("startup")
async def startup_db_client():
    print(f"Tentative de connexion à MongoDB à l'adresse: {MONGO_DETAILS}")
    app.mongodb_client = AsyncIOMotorClient(MONGO_DETAILS)
    app.database = app.mongodb_client[DATABASE_NAME]
    print(f"Connecté à la base de données MongoDB: {DATABASE_NAME}, Collection: {CONVERSATIONS_COLLECTION_NAME}")

@app.on_event("shutdown")
async def shutdown_db_client():
    print("Fermeture de la connexion à MongoDB.")
    app.mongodb_client.close()

@app.get("/")
async def read_root():
    return {"message": "Server is working !!!"}

@app.post("/chat")
async def chat_with_ollama(request: ChatRequest):
    ollama_host = os.getenv("OLLAMA_HOST")
    if not ollama_host:
        raise ValueError("OLLAMA_HOST environment variable not set.")
    ollama_api_url = f"{ollama_host}/api/generate"

    user_message = ChatMessage(role="user", content=request.prompt)
    conversation_id = request.conversation_id

    if conversation_id:
        try:
            existing_conversation = await app.database[CONVERSATIONS_COLLECTION_NAME].find_one(
                {"_id": ObjectId(conversation_id)}
            )
            if not existing_conversation:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Conversation with ID {conversation_id} not found."
                )
            conversation = Conversation(**existing_conversation)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid conversation ID format: {e}"
            )
    else:
        conversation = Conversation(messages=[])

    conversation.messages.append(user_message)
    conversation.updated_at = datetime.utcnow()

    payload = {
        "model": request.model,
        "prompt": request.prompt,
        "stream": False
    }

    print(f"Sending request to Ollama : {ollama_api_url} with payload : {payload}")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                ollama_api_url,
                json=payload,
                timeout=3600.0
            )
            response.raise_for_status()

        ollama_response = response.json()
        print(f"Ollama response : {ollama_response}")
        generated_text = ollama_response.get("response", "No Response generated")

        assistant_message = ChatMessage(role="assistant", content=generated_text)
        conversation.messages.append(assistant_message)
        conversation.updated_at = datetime.utcnow()

        if conversation_id:
            await app.database[CONVERSATIONS_COLLECTION_NAME].update_one(
                {"_id": ObjectId(conversation_id)},
                {"$set": conversation.model_dump(by_alias=True, exclude={"id", "created_at"})}
            )
            return {"response": generated_text, "conversation_id": str(conversation.id)}
        else:
            result = await app.database[CONVERSATIONS_COLLECTION_NAME].insert_one(
                conversation.model_dump(by_alias=True)
            )
            return {"response": generated_text, "conversation_id": str(result.inserted_id)}

    except httpx.RequestError as e:
        print(f"Error request to Ollama : {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Connection Error to Ollama : {e}"
        )
    except httpx.HTTPStatusError as e:
        print(f"Status error to Ollama : {e.response.status_code} - {e.response.text}")
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Error to Ollama : {e.response.text}"
        )
    except Exception as e:
        print(f"Unexpected Error : {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected Error : {e}"
        )

@app.get("/history/{conversation_id}", response_model=Conversation)
async def get_chat_history(conversation_id: str):
    try:
        if (conversation := await app.database[CONVERSATIONS_COLLECTION_NAME].find_one(
            {"_id": ObjectId(conversation_id)}
        )) is not None:
            return Conversation(**conversation)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid conversation ID format: {e}"
        )
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Conversation with ID {conversation_id} not found.")