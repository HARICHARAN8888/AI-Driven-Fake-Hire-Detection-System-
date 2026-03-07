-- Supabase Schema for Fake Hire & Recruitment Scam Intelligence Platform

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users & Roles
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Admin', 'Investigator', 'Recruiter', 'Candidate')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Companies
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    domain TEXT UNIQUE NOT NULL,
    blockchain_id TEXT, -- Tied to Polygon registry
    trust_score INT DEFAULT 50 CHECK (trust_score BETWEEN 0 AND 100),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Recruiters Registry (Blockchain linked)
CREATE TABLE recruiters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    linkedin_url TEXT,
    blockchain_wallet_address TEXT UNIQUE,
    verified_badge BOOLEAN DEFAULT FALSE,
    trust_score INT DEFAULT 50 CHECK (trust_score BETWEEN 0 AND 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Scam Cases / Reports
CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    scam_type VARCHAR(100) CHECK (scam_type IN ('Phishing', 'Fake_Offer', 'Impersonation', 'Advance_Fee')),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Investigating', 'Confirmed_Fraud', 'False_Alarm')),
    ai_risk_score INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. AI Risk Scores & Logs
CREATE TABLE risk_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    entity_type TEXT CHECK (entity_type IN ('URL', 'Email', 'Document', 'Profile')),
    entity_value TEXT NOT NULL,
    fraud_score INT NOT NULL,
    confidence INT NOT NULL,
    risk_level TEXT CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    ai_models_used TEXT[],
    reason_codes TEXT[],
    recommended_action TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Phishing URLs
CREATE TABLE phishing_urls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    domain TEXT,
    risk_level TEXT CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    ai_risk_score INT,
    source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Emails Scanned
CREATE TABLE emails_scanned (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_email TEXT,
    subject TEXT,
    body_snippet TEXT,
    ai_risk_score INT,
    risk_level TEXT CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Fraud Networks and Entities
CREATE TABLE fraud_networks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    network_name TEXT,
    risk_score INT,
    node_count INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    network_id UUID REFERENCES fraud_networks(id) ON DELETE CASCADE,
    entity_type TEXT CHECK (entity_type IN ('Recruiter', 'Domain', 'Company', 'Email', 'Phone')),
    entity_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE blockchain_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_hash TEXT NOT NULL,
    contract_address TEXT NOT NULL,
    event_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for scaffolding)
CREATE POLICY "Public profiles are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Candidates can create cases" ON cases FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Admins can view all cases" ON cases FOR SELECT USING (true);
