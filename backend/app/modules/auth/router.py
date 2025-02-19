from fastapi import APIRouter, Depends, HTTPException
from app.services.supabase import supabase

from app.modules.auth.models import *
from app.core.security import verify_jwt

router = APIRouter()

@router.post("/signup")
async def signup(request: SignupRequest):
    try:
        response = supabase.auth.sign_up({
            "email": request.email,
            "password": request.password
        })
        return response.model_dump()["session"]["access_token"]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(request: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password
        })
        return response.model_dump()["session"]["access_token"]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/me")
async def get_current_user(user = Depends(verify_jwt)):
    return user


# curl -X POST http://127.0.0.1:8000/auth/signup \
#   -H "Content-Type: application/json" \
#   -d '{"email": "ajinkya.tale123@gmail.com", "password": "password"}'

# curl -X POST http://127.0.0.1:8000/auth/login \
#   -H "Content-Type: application/json" \
#   -d '{"email": "ajinkya.tale123@gmail.com", "password": "password"}'

# curl -X GET http://127.0.0.1:8000/auth/me \
#   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkpuaHhlTmFZRnJFQ0xnSzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2RlZ2RwdG9ib2lneXlvcmZxaGptLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhMzg4OWVhOS0wOWFlLTQyMmQtOWUxZS05M2QwNjVkMzE5NWQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQwMDA4ODM5LCJpYXQiOjE3NDAwMDUyMzksImVtYWlsIjoiYWppbmt5YS50YWxlMTIzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJhamlua3lhLnRhbGUxMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiYTM4ODllYTktMDlhZS00MjJkLTllMWUtOTNkMDY1ZDMxOTVkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDAwMDUyMzl9XSwic2Vzc2lvbl9pZCI6ImU2NTMwMzM0LTgxMTgtNDA0OC1hZjU2LTIyZTk4NzQzYjQ2YyIsImlzX2Fub255bW91cyI6ZmFsc2V9.5EFUr2q1xctHYhg1HcGXshQulkxAlOEz79hBYBZVkls"