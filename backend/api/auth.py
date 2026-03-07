from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from backend.core.db import get_supabase_client

router = APIRouter(prefix="/auth", tags=["Authentication"])
db = get_supabase_client()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(request: LoginRequest):
    try:
        # Supabase auth login
        res = db.auth.sign_in_with_password({"email": request.email, "password": request.password})
        return {"access_token": res.session.access_token, "user": res.user}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.get("/me")
async def get_current_user_profile(token: str):
    """Fetches user profile and their RBAC role from the active token session"""
    user_res = db.auth.get_user(token)
    if not user_res:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    uid = user_res.user.id
    record = db.table("users").select("*").eq("id", uid).execute()
    if not record.data:
        raise HTTPException(status_code=404, detail="User DB record not found")
        
    return {"id": uid, "role": record.data[0]["role"], "email": record.data[0]["email"]}
