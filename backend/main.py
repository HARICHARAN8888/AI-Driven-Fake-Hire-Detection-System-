from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="AI-Driven Fake Hire Detection System API",
    description="Backend for Identifying and Preventing Recruitment Scams",
    version="1.0.0"
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change in production to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthResponse(BaseModel):
    status: str
    message: str

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return {"status": "ok", "message": "Cyber AI Core Online"}

# Import routers - use try/except so server still boots if a module has issues
try:
    from api import auth, candidate, recruiter, agents
    app.include_router(auth.router)
    app.include_router(candidate.router)
    app.include_router(recruiter.router)
    app.include_router(agents.router)
except ImportError as e:
    print(f"WARNING: Could not import one or more API routers: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
