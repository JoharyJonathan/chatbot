# Ollama Chatbot

A simple chatbot application built to explore and experiment with **Ollama's API** and locally running Large Language Models (LLMs).

The project provides a web interface for interacting with locally hosted AI models, with a FastAPI backend responsible for communicating with Ollama and storing conversations in MongoDB.

> **Project status:** Experimental / Personal Learning Project

## Overview

The main purpose of this project is to understand how to integrate locally running language models into a web application using Ollama.

It explores the communication between a frontend application, a Python API, a local LLM runtime, and a database for conversation persistence.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and build tool |
| TypeScript | Frontend development |
| FastAPI | Backend REST API |
| Python | Backend development |
| Ollama | Local LLM runtime and API |
| MongoDB | Conversation storage |
| Motor | Asynchronous MongoDB driver |
| HTTPX | Asynchronous HTTP requests |
| Pydantic | Data validation |

## Features

- **AI Chat:** Interact with locally hosted language models through Ollama.
- **Conversation Management:** Create and maintain conversations.
- **Conversation Persistence:** Store messages and conversation metadata in MongoDB.
- **Conversation History:** Retrieve previously stored conversations.
- **Asynchronous API:** Use FastAPI and asynchronous HTTP/database operations.
- **Configurable Model:** Select an Ollama model through the API request.

## Architecture

The application follows a simple client-server architecture:

```text
┌──────────────────────┐
│    React + Vite      │
│      Frontend        │
└──────────┬───────────┘
           │ HTTP
           ▼
┌──────────────────────┐
│       FastAPI        │
│       Backend        │
└──────┬─────────┬─────┘
       │         │
       ▼         ▼
┌────────────┐ ┌──────────────┐
│  MongoDB   │ │    Ollama    │
│            │ │ Local Models │
└────────────┘ └──────────────┘
```

- **Frontend:** Handles user interactions and displays chatbot responses.
- **Backend:** Processes requests, communicates with Ollama, and manages conversation data.
- **Ollama:** Runs language models locally and generates responses.
- **MongoDB:** Stores conversations and their messages.

## Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- [Ollama](https://ollama.com/)
- [MongoDB](https://www.mongodb.com/)

You also need to download an Ollama model. For example:

```bash
ollama pull llama3.2:3b
```

Make sure the Ollama service is running before starting the backend.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/JoharyJonathan/chatbot.git
cd chatbot
```

### 2. Configure the backend

Navigate to the project root and create a virtual environment:

```bash
python -m venv venv
```

Activate it:

**Windows:**
```bash
venv\Scripts\activate
```

**Linux / macOS:**
```bash
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file based on `.env.example`:

```env
MONGO_DETAILS=mongodb://localhost:27017
DATABASE_NAME=ollama_chatbot
CONVERSATIONS_COLLECTION_NAME=conversations
OLLAMA_HOST=http://localhost:11434
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

FastAPI interactive documentation:

```text
http://localhost:8000/docs
```

### 3. Configure the frontend

Open another terminal:

```bash
cd front
npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## Project Structure

```text
.
├── main.py
├── requirements.txt
├── .env.example
│
└── front/
    ├── src/
    │   └── pages/
    │       ├── HomePage.tsx
    │       ├── AboutPage.tsx
    │       ├── ContactPage.tsx
    │       └── HistoryPage.tsx
    ├── package.json
    └── ...
```

## Learning Objectives

This project is primarily an opportunity to experiment with:

- Integrating Ollama into a web application.
- Understanding how local LLMs communicate through HTTP APIs.
- Building asynchronous APIs with FastAPI.
- Managing conversation data with MongoDB.
- Connecting a React frontend to a Python backend.
- Exploring the possibilities and limitations of locally hosted language models.

## Future Improvements

This project is still experimental. Possible improvements include:

- Implementing more complete conversation management (create, retrieve, update, and delete).
- Improving conversation context handling.
- Supporting dynamic model selection.
- Adding response streaming.
- Improving error handling and API validation.
- Adding automated tests.
- Improving the user interface and overall user experience.

## Disclaimer

This project is intended for educational and experimental purposes. It is not currently designed as a production-ready chatbot.

The quality, speed, and capabilities of generated responses depend on the selected model and the available hardware.