from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.core.db import get_supabase_client
# Example: from frontend.lib.blockchain import fetchRecruiterScore (would be ported to python web3 for backend)

router = APIRouter(prefix="/recruiter", tags=["Recruiter Registry"])
db = get_supabase_client()

class RecruiterRegistration(BaseModel):
    full_name: str
    linkedin_url: str
    company_domain: str
    wallet_address: str

@router.post("/register")
async def register(req: RecruiterRegistration):
    """Registers a recruiter and awaits Blockchain validation by Admin"""
    data = {"full_name": req.full_name, "linkedin_url": req.linkedin_url, "blockchain_wallet_address": req.wallet_address}
    
    # Store in Postgres. Later, Admin issues the Smart Contract verified badge.
    res = db.table('recruiters').insert(data).execute()
    return {"message": "Registration submitted for verification", "id": res.data[0]['id']}

@router.get("/verify/{wallet_address}")
async def check_trust_score(wallet_address: str):
    """Queries the Postgres DB (or directly the Polygon RPC) to get the trust score"""
    res = db.table('recruiters').select("full_name, trust_score, verified_badge").eq("blockchain_wallet_address", wallet_address).execute()
    
    if not res.data:
        raise HTTPException(status_code=404, detail="Recruiter not found in registry")
        
    return res.data[0]
