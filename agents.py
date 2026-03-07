from fastapi import APIRouter, BackgroundTasks
from ai_agents.job_scam_hunter import JobScamHunterAgent
from ai_agents.phishing_hunter import PhishingDomainHunterAgent
from ai_agents.glassdoor_hunter import GlassdoorHunterAgent

router = APIRouter(prefix="/agents", tags=["Autonomous Agents"])

async def _run_job_hunter():
    agent = JobScamHunterAgent()
    await agent.run()

async def _run_phishing_hunter():
    agent = PhishingDomainHunterAgent()
    await agent.run()

async def _run_glassdoor_hunter():
    agent = GlassdoorHunterAgent()
    await agent.run()

@router.post("/trigger/job-hunter")
async def trigger_job_hunter(background_tasks: BackgroundTasks):
    """Manually triggers the Job Scam Hunter agent (normally runs on cron)"""
    background_tasks.add_task(_run_job_hunter)
    return {"message": "Job Scam Hunter agent started in background"}

@router.post("/trigger/phishing-hunter")
async def trigger_phishing_hunter(background_tasks: BackgroundTasks):
    """Manually triggers the Phishing Domain agent"""
    background_tasks.add_task(_run_phishing_hunter)
    return {"message": "Phishing Domain Hunter agent started in background"}

@router.post("/trigger/glassdoor-hunter")
async def trigger_glassdoor_hunter(background_tasks: BackgroundTasks):
    """Manually triggers the Glassdoor reputation agent"""
    background_tasks.add_task(_run_glassdoor_hunter)
    return {"message": "Glassdoor Hunter agent started in background"}
