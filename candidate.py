from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from backend.services.ai_inference import detect_phishing_url, analyze_nlp_scam
from backend.services.scoring_engine import calculate_fraud_risk

router = APIRouter(prefix="/candidate", tags=["Candidate Protection"])

class ScanRequest(BaseModel):
    text: Optional[str] = None
    url: Optional[str] = None
    email_body: Optional[str] = None
    document_base64: Optional[str] = None

@router.post("/scan")
async def scan_for_scam(request: ScanRequest):
    """
    Candidate uploads an offer letter, points to a URL, or pastes recruiter emails.
    Aggregates signals and returns the Scam Risk JSON.
    """
    nlp_prob = 0.0
    phishing_prob = 0.0
    doc_anomalies = 0
    blockchain_trust = 50.0 # Default unknown trust
    
    # Run pipelines based on provided inputs
    if request.text or request.email_body:
        val = request.text or request.email_body
        res = await analyze_nlp_scam(val)
        nlp_prob = res.get("scam_probability", 0.0)
        
    if request.url:
        # For full implementation, we extract XGBoost features first
        features = {"is_typosquatting": False} 
        phishing_prob = await detect_phishing_url(request.url, features)
        
    if request.document_base64:
        # Here we would call the LayoutLM / Donut extraction logic
        # and parse the doc_anomalies
        doc_anomalies = 1 # Simulation
        
    # Generate unified score
    score_report = calculate_fraud_risk(
        nlp_prob=nlp_prob,
        document_anomalies=doc_anomalies,
        phishing_prob=phishing_prob,
        network_risk_score=0.1, # Mock DB cluster extraction
        blockchain_trust=blockchain_trust
    )
    
    return score_report
