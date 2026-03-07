import os
import pandas as pd
from backend.core.db import get_supabase_client

db = get_supabase_client()

def ingest_kaggle_dataset(csv_path: str):
    """
    Ingests EMSCAD or other Kaggle fake job posting datasets into our Supabase Postgres table.
    Expects columns: title, company_profile, description, fraudulent
    """
    if not os.path.exists(csv_path):
        print(f"Dataset {csv_path} not found. Please download from Kaggle.")
        return
        
    df = pd.read_csv(csv_path)
    # Filter and map columns appropriately
    records = []
    for _, row in df.iterrows():
        # Example processing
        title = str(row.get('title', 'Unknown'))
        desc = str(row.get('description', ''))
        is_fraud = bool(row.get('fraudulent', False))
        
        status = 'Confirmed_Fraud' if is_fraud else 'False_Alarm'
        
        records.append({
            "title": f"Historical Kaggle Data: {title}",
            "description": desc,
            "scam_type": "Fake_Offer",
            "status": status,
            "ai_risk_score": 100 if is_fraud else 0
        })
        
    # Batch insert into Supabase
    # In production, slice into batches of 1000 to prevent timeout
    batch_size = 500
    for i in range(0, len(records), batch_size):
        db.table('cases').insert(records[i:i+batch_size]).execute()
        print(f"Inserted batch {i} to {i+batch_size}")

if __name__ == "__main__":
    ingest_kaggle_dataset("fake_job_postings.csv")
