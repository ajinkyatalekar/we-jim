from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth.router import router as auth_router
from app.config.settings import get_settings

settings = get_settings()

app = FastAPI(title="WeJimAPI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # PRODUCTION: Replace domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)