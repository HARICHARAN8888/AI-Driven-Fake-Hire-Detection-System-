import asyncio
import logging
from backend.services.ai_inference import analyze_nlp_scam
from backend.core.db import get_supabase_client

logger = logging.getLogger("JobScamHunter")
db = get_supabase_client()

class JobScamHunterAgent:
    """Agent that crawls Glassdoor/Kaggle dataset equivalents and scores them via NLP"""
    def __init__(self):
        self.target_boards = ["scraped_kaggle_jobs", "glassdoor_rss"]

    async def fetch_recent_jobs(self):
        # Mock logic representing an API call to a scraped jobs database
        return [{"id": "j1", "title": "Data Entry Remote", "desc": "Make $500/day working 1 hour!"}]

    async def run(self):
        jobs = await self.fetch_recent_jobs()
        for job in jobs:
            text_to_analyze = f"{job['title']} - {job['desc']}"
            score = await analyze_nlp_scam(text_to_analyze)
            
            if score['scam_probability'] > 0.7:
                logger.warning(f"High risk job detected: {job['id']} | Score: {score}")
                db.table('cases').insert({
                    "title": "Automated Job Scam Detection",
                    "description": text_to_analyze,
                    "scam_type": "Fake_Offer",
                    "status": "Pending",
                    "ai_risk_score": int(score['scam_probability'] * 100)
                }).execute()

if __name__ == "__main__":
    agent = JobScamHunterAgent()
    asyncio.run(agent.run())
