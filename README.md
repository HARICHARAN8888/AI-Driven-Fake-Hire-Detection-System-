# AI-Driven Fake Hire Detection System for Identifying and Preventing Recruitment Scams 🌍

Welcome to the **Global Scam Intelligence Network** monorepo. This platform protects job seekers globally from fake job offers, phishing recruitment URLs, and fraudulent recruiter personas by combining AI, Blockchain, and Threat Intelligence.

## 📦 Project Structure

```
├── .github/workflows/      # CI/CD pipelines (Vercel & Railway)
├── ai_agents/              # Autonomous AI Fraud Hunter Agents (Python)
├── backend/                # FastAPI Core Application, Scoring Engine, API routers
├── frontend/               # Next.js 14 App Router, TailwindCSS, shadcn Theme
└── smart_contracts/        # Hardhat project with Polygon Recruiter Registry
```

## 🚀 Quick Deploy Guide (Free Infrastructure)

The architecture is explicitly designed to be deployed for **$0** using standard free tiers.

### 1. Database (Supabase PostgreSQL)
1. Navigate to [Supabase](https://supabase.com) and create a free project.
2. Run the SQL schema found in `backend/models/schema.sql` in the Supabase SQL Editor.
3. Copy your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE` into your `.env`.

### 2. Frontend Deployment (Vercel)
1. Fork this repository to your GitHub.
2. Log in to [Vercel](https://vercel.com) and connect your GitHub account.
3. Import this repository. Set the **Framework Preset** to `Next.js` and the **Root Directory** to `frontend`.
4. Click **Deploy**. Vercel will build and host your app for free.

### 3. Backend Deployment (Railway or Render)
1. Log in to [Railway](https://railway.app) (Free Starter tier).
2. Create a "New Project" -> "Deploy from GitHub repo".
3. Point to the `backend` directory. Railway will automatically detect the `requirements.txt` and start the FastAPI (`uvicorn`) backend.

### 4. Smart Contracts (Polygon Amoy Testnet)
Free deployment on Polygon's test network (Amoy) or inexpensive on Mainnet.
1. `cd smart_contracts`
2. `npm install`
3. Configure `POLYGON_RPC_URL` (free from Alchemy/Infura) in `.env`
4. Deploy: `npm run deploy:amoy`

### 5. AI Models (Hugging Face Inference APIs)
1. Create a free account on [Hugging Face](https://huggingface.co).
2. Navigate to Settings -> Access Tokens and generate a Read/Write token.
3. Set `HUGGINGFACE_API_KEY` in your backend environment variables. The API will use `deberta-v3-base` and `distilbert` directly from HF's free inference layer.

## 🤖 Running Autonomous Agents
To turn on the dark web or phishing scrapers, run them as background tasks via cron jobs or manually via the API:
```bash
python ai_agents/phishing_hunter.py
```

## 🌟 Technologies Used
- Next.js 14, Tailwind CSS, Framer Motion
- FastAPI, PyTorch Geometric, Pandas
- Hardhat, Solidity, Ethers.js (Polygon)
- Supabase (Postgres, Auth, RLS)
- OpenTelemetry (Grafana Tracing)
