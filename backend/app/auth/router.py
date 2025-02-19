from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.services.supabase import supabase
from app.core.security import verify_jwt

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup(request: SignupRequest):
    try:
        response = supabase.auth.sign_up({
            "email": request.email,
            "password": request.password
        })
        return response.model_dump()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(request: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password
        })
        return response.model_dump()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me")
async def get_current_user(user = Depends(verify_jwt)):
    return user

# curl -X POST http://127.0.0.1:8000/auth/signup \
#   -H "Content-Type: application/json" \
#   -d '{"email": "ajinkya.talekar123@gmail.com", "password": "password"}'

# curl -X POST http://127.0.0.1:8000/auth/login \
#   -H "Content-Type: application/json" \
#   -d '{"email": "ajinkya.talekar123@gmail.com", "password": "password"}'

# curl -X GET http://127.0.0.1:8000/auth/me \
#   -H "Authorization: Bearer <your_jwt_token>"
