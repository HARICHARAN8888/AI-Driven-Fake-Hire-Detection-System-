@echo off
echo Launching AI Fraud Hunter Agents...
cd backend
call venv\Scripts\activate
cd ..
start python ai_agents/job_scam_hunter.py
start python ai_agents/phishing_hunter.py
start python ai_agents/email_analyzer.py
start python ai_agents/linkedin_analyzer.py
start python ai_agents/glassdoor_hunter.py
echo Agents are now running in the background.
pause
