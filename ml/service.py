from fastapi import FastAPI
from pydantic import BaseModel
import os, requests

app = FastAPI(title="DRISHTI-ML")
OLLAMA = os.getenv("OLLAMA_BASE_URL", "http://ollama:11434")

class TextIn(BaseModel):
    text: str
    model: str | None = "llama3"

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/embed")
def embed(inp: TextIn):
    # TODO: replace with real HF embedding model; stub for now
    return {"vector": [0.1, 0.2, 0.3], "len": len(inp.text)}

@app.post("/llm")
def llm(inp: TextIn):
    # Calls Ollama if available
    try:
        r = requests.post(f"{OLLAMA}/api/generate", json={"model": inp.model or "llama3", "prompt": inp.text, "stream": False}, timeout=60)
        r.raise_for_status()
        data = r.json()
        return {"output": data.get("response", "")}
    except Exception as e:
        return {"error": str(e), "hint": "Ensure Ollama is running and model pulled"}
