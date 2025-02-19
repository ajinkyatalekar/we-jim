from fastapi import APIRouter, Depends, HTTPException
from app.services.supabase import supabase
from app.modules.auth.models import *
from datetime import datetime
from app.core.security import verify_jwt
from app.modules.profiles.models import ProfileUpdateSchema

router = APIRouter()

@router.get("/get")
async def get_profile(user = Depends(verify_jwt)):
    try:
        response = (supabase.table('profiles')
            .select("*")
            .eq('id', user.user.id)
            .single()
            .execute()
          )
            
        if not response.data:
            raise HTTPException(status_code=404, detail="Profile not found")
            
        return response
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/update")
async def update_profile(
    updates: ProfileUpdateSchema,
    user = Depends(verify_jwt)
):
    """
    Update user profile fields.
    Protected fields (id, created_at, updated_at) cannot be modified.
    """
    try:
        update_data = updates.model_dump(exclude_none=True)
        update_data["updated_at"] = datetime.utcnow().isoformat()
        
        response = (
            supabase.table('profiles')
            .update(update_data)
            .eq('id', user.user.id)
            .execute()
        )
        
        if not response.data:
            raise HTTPException(
                status_code=404,
                detail="Profile not found or no changes applied"
            )
            
        return response.data[0]
        
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to update profile: {str(e)}"
        )

# curl -X GET http://127.0.0.1:8000/profiles/get \
#   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkpuaHhlTmFZRnJFQ0xnSzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2RlZ2RwdG9ib2lneXlvcmZxaGptLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhMzg4OWVhOS0wOWFlLTQyMmQtOWUxZS05M2QwNjVkMzE5NWQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQwMDA4ODM5LCJpYXQiOjE3NDAwMDUyMzksImVtYWlsIjoiYWppbmt5YS50YWxlMTIzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJhamlua3lhLnRhbGUxMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiYTM4ODllYTktMDlhZS00MjJkLTllMWUtOTNkMDY1ZDMxOTVkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDAwMDUyMzl9XSwic2Vzc2lvbl9pZCI6ImU2NTMwMzM0LTgxMTgtNDA0OC1hZjU2LTIyZTk4NzQzYjQ2YyIsImlzX2Fub255bW91cyI6ZmFsc2V9.5EFUr2q1xctHYhg1HcGXshQulkxAlOEz79hBYBZVkls"

# curl -X PATCH http://127.0.0.1:8000/profiles/update \
# -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkpuaHhlTmFZRnJFQ0xnSzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2RlZ2RwdG9ib2lneXlvcmZxaGptLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJhMzg4OWVhOS0wOWFlLTQyMmQtOWUxZS05M2QwNjVkMzE5NWQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQwMDA4ODM5LCJpYXQiOjE3NDAwMDUyMzksImVtYWlsIjoiYWppbmt5YS50YWxlMTIzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJhamlua3lhLnRhbGUxMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiYTM4ODllYTktMDlhZS00MjJkLTllMWUtOTNkMDY1ZDMxOTVkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NDAwMDUyMzl9XSwic2Vzc2lvbl9pZCI6ImU2NTMwMzM0LTgxMTgtNDA0OC1hZjU2LTIyZTk4NzQzYjQ2YyIsImlzX2Fub255bW91cyI6ZmFsc2V9.5EFUr2q1xctHYhg1HcGXshQulkxAlOEz79hBYBZVkls' \
# -H 'Content-Type: application/json' \
# -d '{
#   "display_name": "Johne",
#   "weight": "157.7",
#   "height": "170.2",
#   "gender": "male",
#   "date_of_birth": "1992-01-23"
# }'