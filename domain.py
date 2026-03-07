from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.orm import declarative_base
from datetime import datetime, timezone
import uuid
import enum

Base = declarative_base()

def generate_uuid():
    return str(uuid.uuid4())

class UserRole(enum.Enum):
    Admin = "Admin"
    Investigator = "Investigator"
    Recruiter = "Recruiter"
    Candidate = "Candidate"

class ScamType(enum.Enum):
    Phishing = "Phishing"
    Fake_Offer = "Fake_Offer"
    Impersonation = "Impersonation"
    Advance_Fee = "Advance_Fee"

class CaseStatus(enum.Enum):
    Pending = "Pending"
    Investigating = "Investigating"
    Confirmed_Fraud = "Confirmed_Fraud"
    False_Alarm = "False_Alarm"

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class Company(Base):
    __tablename__ = "companies"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    domain = Column(String, unique=True, nullable=False)
    blockchain_id = Column(String, nullable=True)
    trust_score = Column(Integer, default=50)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class Recruiter(Base):
    __tablename__ = "recruiters"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    company_id = Column(String(36), ForeignKey("companies.id", ondelete="SET NULL"), nullable=True)
    full_name = Column(String, nullable=False)
    linkedin_url = Column(String, nullable=True)
    blockchain_wallet_address = Column(String, unique=True, nullable=True)
    verified_badge = Column(Boolean, default=False)
    trust_score = Column(Integer, default=50)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = relationship("User")
    company = relationship("Company")

class Case(Base):
    __tablename__ = "cases"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    reporter_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    scam_type = Column(Enum(ScamType), nullable=True)
    status = Column(Enum(CaseStatus), default=CaseStatus.Pending)
    ai_risk_score = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    reporter = relationship("User")
