from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.services.supabase import supabase

security = HTTPBearer()

async def verify_jwt(credentials: HTTPAuthorizationCredentials = Security(security)):
    try:
        jwt = credentials.credentials
        user = supabase.auth.get_user(jwt)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials"
        )
