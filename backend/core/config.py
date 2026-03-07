import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Scam Intelligence Core"
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "your-anon-key")
    SUPABASE_SERVICE_ROLE: str = os.getenv("SUPABASE_SERVICE_ROLE", "your-service-role")
    
    HUGGINGFACE_API_KEY: str = os.getenv("HUGGINGFACE_API_KEY", "hf_key_here")
    POLYGON_RPC_URL: str = os.getenv("POLYGON_RPC_URL", "https://polygon-rpc.com")
    
    # Redis / Celery or Upstash configuration
    REDIS_URL: str = os.getenv("REDIS_URL", "rediss://default:pwd@upstash.io:6379")

settings = Settings()
