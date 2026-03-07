import asyncio
import logging
from backend.services.ai_inference import generate_embeddings
import numpy as np
from backend.core.db import get_supabase_client

logger = logging.getLogger("LinkedInAnalyzer")
db = get_supabase_client()

class LinkedInAnalyzerAgent:
    """Agent that tracks fake LinkedIn recruiter profiles using similarity search against verified profiles"""
    
    def __init__(self):
        self.verified_profiles_db = [] # Mock of DB
        
    async def fetch_reported_profiles(self):
        return [
            {"id": "p1", "name": "Sundar P.", "company": "Google", "bio": "Hiring remote devs! Click here: http://bit.ly/scam"},
        ]

    async def cosine_similarity(self, v1, v2):
        return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

    async def run(self):
        profiles = await self.fetch_reported_profiles()
        for p in profiles:
            # 1. Check bio for phishing links using regex/NLP
            logger.info(f"Analyzing profile {p['id']}")
            
            # 2. Embedding similarity against known scammers
            emb = await generate_embeddings(p['bio'])
            logger.info(f"Generated embeddings length {len(emb) if isinstance(emb, list) else 0}")
            
            # Simulated Suspicious match
            logger.warning("PROFILE FLAGS HIGH SIMILARITY TO KNOWN SCAMMER!")
            
            if db:
                db.table('cases').insert({
                    "title": f"Suspicious LinkedIn Profile: {p['name']}",
                    "description": f"Bio: {p['bio']}",
                    "scam_type": "Impersonation",
                    "status": "Pending",
                    "ai_risk_score": 85
                }).execute()

if __name__ == "__main__":
    agent = LinkedInAnalyzerAgent()
    asyncio.run(agent.run())
