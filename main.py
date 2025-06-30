from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os

app = FastAPI()

origins = [
    "http://localhost:5173",
]

class ChatRequest(BaseModel):
    prompt: str
    model: str = "llama3.2:3b"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Server is working !!!"}

@app.post("/chat")
async def chat_with_ollama(request: ChatRequest):
    ollama_host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
    ollama_api_url = f"{ollama_host}/api/generate"
    
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
        
        return {"response": generated_text}
    
    except httpx.RequestError as e:
        print(f"Error request to Ollama : {e}")
        raise HTTPException(
            status_code=500,
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
            status_code=500,
            detail=f"Unexpected Error : {e}"
        )