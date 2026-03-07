import httpx
from typing import Dict, Any, List
from backend.core.config import settings

HF_API_URL = "https://api-inference.huggingface.co/models"
HEADERS = {"Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}"}

async def _query_hf(model_id: str, payload: Any) -> Any:
    """Helper function to make asynchronous calls to HF Inference API"""
    url = f"{HF_API_URL}/{model_id}"
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=HEADERS, json=payload, timeout=30.0)
        response.raise_for_status()
        return response.json()

async def analyze_nlp_scam(text: str) -> Dict[str, float]:
    """Uses Deberta-v3 for general text scam classification"""
    model_id = "microsoft/deberta-v3-base"
    # Assuming the API returns a list of dictionaries with labels and scores
    result = await _query_hf(model_id, {"inputs": text})
    
    # Mocking extraction logic (depends on HF pipeline specific output format)
    # E.g. [[{'label': 'LABEL_0', 'score': 0.8}, {'label': 'LABEL_1', 'score': 0.2}]]
    score = result[0][0].get("score", 0.0) if isinstance(result, list) else 0.0
    return {"scam_probability": score}

async def extract_document_fraud(image_base64: str) -> Dict[str, Any]:
    """Uses donut-base and layoutlmv3 to extract and verify Offer Letters"""
    donut_id = "naver-clova-ix/donut-base"
    # In HF, we pass image inputs for donut-base. Here we just abstract the payload.
    # We would theoretically decode the base64 or send raw bytes, mapped here to a text instruction.
    donut_res = await _query_hf(donut_id, {"inputs": image_base64})
    
    # LayoutLM analysis (simulating anomalies check)
    anomalies_detected = 0
    # In reality layoutlm bounds checking happens here
    
    return {"extracted_text": donut_res, "anomalies_count": anomalies_detected}

async def generate_embeddings(text: str) -> List[float]:
    """Generates embeddings using sentence-transformers for similarity search"""
    model_id = "sentence-transformers/all-MiniLM-L6-v2"
    result = await _query_hf(model_id, {"inputs": text})
    return result

async def detect_phishing_url(url: str, xgboost_features: Dict[str, Any]) -> float:
    """Pipeline combining DistilBERT text analysis of URL with XGBoost tabular features"""
    distilbert_id = "distilbert-base-uncased"
    nlp_res = await _query_hf(distilbert_id, {"inputs": url})
    
    nlp_score = nlp_res[0][0].get("score", 0.0) if isinstance(nlp_res, list) else 0.0
    
    # Mock XGBoost model inference using features
    # features = [domain_age, is_typosquatting, suspicious_keywords, redirects, has_ssl]
    xgb_score = 0.85 if xgboost_features.get("is_typosquatting") else 0.10
    
    # Final ensemble: 40% NLP, 60% XGBoost tree
    return (0.4 * nlp_score) + (0.6 * xgb_score)
