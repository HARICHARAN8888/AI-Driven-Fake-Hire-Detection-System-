import asyncio
import logging
from backend.services.ai_inference import analyze_nlp_scam
from backend.core.db import get_supabase_client

logger = logging.getLogger("EmailAnalyzer")
db = get_supabase_client()

class EmailScamAnalyzerAgent:
    """Monitors incoming forwarded scam emails to an abuse inbox"""
    
    async def fetch_inbox(self):
        # Mocks fetching recent emails from IMAP or a cloud queue like Upstash Redis
        return [
            {"sender": "hr@recruiting-apple.com", "subject": "Job Offer - Urgent", "body": "Please pay $100 for your laptop shipping fee."}
        ]

    async def run(self):
        emails = await self.fetch_inbox()
        for e in emails:
            # Domain check
            domain = e['sender'].split('@')[-1]
            if "apple.com" not in domain and "apple" in domain.lower():
                logger.warning(f"Typosquatting detected: {domain} trying to impersonate Apple")
            
            # NLP Body Check
            score = await analyze_nlp_scam(e['body'])
            if score['scam_probability'] > 0.8:
                logger.error(f"Advance Fee Scam Detected in Email: {e['subject']}")
                if db:
                    db.table('emails_scanned').insert({
                        "sender_email": e['sender'],
                        "subject": e['subject'],
                        "body_snippet": e['body'][:200],
                        "ai_risk_score": int(score['scam_probability'] * 100),
                        "risk_level": "CRITICAL" if score['scam_probability'] > 0.9 else "HIGH"
                    }).execute()

if __name__ == "__main__":
    agent = EmailScamAnalyzerAgent()
    asyncio.run(agent.run())
