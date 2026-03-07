from typing import Dict, Any, List

def calculate_fraud_risk(
    nlp_prob: float, 
    document_anomalies: int, 
    phishing_prob: float, 
    network_risk_score: float, 
    blockchain_trust: float
) -> Dict[str, Any]:
    """
    The main Scoring Engine aggregating signals from all pipelines.
    
    Inputs:
    - nlp_prob (0.0 - 1.0)
    - document_anomalies (int)
    - phishing_prob (0.0 - 1.0)
    - network_risk_score (0.0 - 1.0)
    - blockchain_trust (0 - 100) -> Converted to inverse risk (100 - trust)/100
    
    Returns standard JSON output per requirements.
    """
    
    # 1. Base Score calculation (max 100)
    # Weights for different models
    w_nlp = 0.25
    w_doc = 0.20
    w_phishing = 0.25
    w_graph = 0.20
    w_blockchain = 0.10
    
    # Normalize inputs
    doc_risk = min(document_anomalies * 0.2, 1.0) # 5 anomalies = 1.0 certainty
    blockchain_risk = (100.0 - blockchain_trust) / 100.0
    
    raw_score = (
        (nlp_prob * w_nlp) +
        (doc_risk * w_doc) +
        (phishing_prob * w_phishing) +
        (network_risk_score * w_graph) +
        (blockchain_risk * w_blockchain)
    )
    
    fraud_score = int(raw_score * 100)
    
    # 2. Risk Level Mapping
    if fraud_score >= 80:
        risk_level = "CRITICAL"
    elif fraud_score >= 60:
        risk_level = "HIGH"
    elif fraud_score >= 35:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"
        
    # 3. Reason Codes extraction
    reasons = []
    if nlp_prob > 0.7: reasons.append("HIGH_NLP_SCAM_PROBABILITY")
    if document_anomalies > 2: reasons.append("DOCUMENT_ANOMALIES_DETECTED")
    if phishing_prob > 0.8: reasons.append("PHISHING_DOMAIN_MATCH")
    if network_risk_score > 0.7: reasons.append("KNOWN_FRAUD_RING_PROXIMITY")
    if blockchain_trust < 30: reasons.append("LOW_BLOCKCHAIN_TRUST_SCORE")
    
    # 4. Recommendation Mapping
    action = "PROCEED_WITH_CAUTION"
    if risk_level in ["CRITICAL", "HIGH"]:
        action = "DO_NOT_ENGAGE_IMMEDIATE_BLOCK"
    elif risk_level == "LOW":
        action = "LIKELY_SAFE_OFFER"
        
    return {
        "fraud_score": fraud_score,
        "confidence": 85, # Simplification (would usually be derived mathematically from model vars)
        "risk_level": risk_level,
        "reason_codes": reasons,
        "ai_models_used": [
            "deberta-v3-base", 
            "donut-base", 
            "layoutlmv3-base", 
            "distilbert-base-uncased",
            "pytorch-geometric-graph"
        ],
        "recommended_action": action
    }
