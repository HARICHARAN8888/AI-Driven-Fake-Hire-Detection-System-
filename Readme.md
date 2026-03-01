# AI-Driven Fake Hire Detection Platform

An end-to-end AI-powered system that detects and prevents recruitment fraud in real time.  
The platform verifies recruiters and candidates, analyzes offer letters, detects scam communication, and generates explainable fraud risk scores.

---

## Table of Contents

- Overview
- Problem Statement
- Objectives
- Key Features
- Fraud Detection Scope
- Technology Stack
- System Architecture
- Project Structure
- Installation and Setup
- Deployment
- Security and Compliance
- Scalability
- Future Enhancements
- Team Members
- Contribution
- License
- Contact

---

## Overview

Recruitment fraud is increasing due to the use of AI-generated content, deepfake interviews, phishing domains, and identity impersonation.

This project provides a cloud-native and scalable solution that uses artificial intelligence and modern web technologies to identify fraudulent hiring activities across multiple digital channels.

The system is designed for:

- Enterprises
- Job portals
- HR platforms
- Background verification companies
- Government employment systems

---

## Problem Statement

Current recruitment systems are:

- Reactive instead of preventive  
- Manual and time-consuming  
- Unable to detect AI-generated scams  
- Lacking real-time intelligence  

This creates financial loss, brand damage, and loss of trust in digital hiring.

---

## Objectives

- Detect fake recruiters and candidates
- Identify scam job offers and phishing domains
- Verify offer letter authenticity
- Detect deepfake interviews
- Generate real-time fraud risk scores
- Provide explainable AI-based decisions
- Build a scalable and secure platform

---

## Key Features

- Real-time fraud detection
- Multilingual scam message analysis
- Recruiter and candidate verification
- Offer letter fraud detection
- Domain and email intelligence
- Explainable AI scoring
- Admin investigation dashboard
- Role-based access control
- Continuous model learning pipeline

---

## Fraud Detection Scope

The system detects:

- Fake recruiters
- Fake job offers
- Company impersonation
- Payment request scams
- Phishing and lookalike domains
- Deepfake video and audio interviews
- Fraudulent candidate profiles
- Reused bank and payment identities

---

## Technology Stack

### Programming Languages

- Python
- TypeScript
- SQL

### Frontend

- Next.js
- Tailwind CSS
- ShadCN UI
- Framer Motion
- Recharts

### Backend

- FastAPI
- REST APIs
- WebSocket support

### AI and Machine Learning

- Hugging Face Inference API
- PyTorch
- Scikit-learn
- Sentence Transformers

### Data and Model Training

- Kaggle datasets
- Custom fraud data pipeline

### Database and Authentication

- Supabase (PostgreSQL)

### Deployment Platforms (Free Tier)

- Vercel – Frontend
- Railway or Render – Backend
- Hugging Face Spaces – ML services

### Version Control and CI/CD

- GitHub

---

## System Architecture

The platform follows a microservices-based architecture.

Core components:

- API Gateway
- AI inference services
- Fraud scoring engine
- Knowledge graph database
- Real-time processing pipeline
- Admin dashboard

Each request is processed and returns:

- Fraud score (0–100)
- Confidence score
- Risk level
- Reason codes
- Recommended action

---

## Project Structure
frontend/ # Next.js application
backend/ # FastAPI services
ml-services/ # Hugging Face model integration
database/ # SQL schema and migrations
docs/ # Architecture and design documents

---

## Installation and Setup

### Prerequisites

- Node.js
- Python 3.10 or above
- Git
- Supabase account
- Hugging Face account

### Clone the Repository


---

## Deployment

Frontend:
- Deploy using Vercel

Backend:
- Deploy using Railway or Render

Machine Learning Services:
- Deploy using Hugging Face Spaces (Docker)

Database:
- Supabase PostgreSQL

---

## Security and Compliance

- Zero trust architecture
- End-to-end encryption
- Role-based access control
- Row level security
- Secure API gateway
- GDPR-ready design

---

## Scalability

The system is designed to support:

- Millions of users
- Real-time fraud detection under 500 milliseconds
- Horizontal scaling
- High availability architecture

---

## Future Enhancements

- Blockchain-based offer letter verification
- Global recruiter digital identity system
- Browser extension for scam detection
- Mobile application for instant alerts
- Federated fraud intelligence network

---

## Team Members

- Janani
- Kavitha
- Sri Hariharan Seshan
- Ezilarasan

---

## Contribution

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Open a pull request

---

## License

This project uses open-source technologies.  
Select an appropriate license before production deployment.

---

## Contact

For queries, suggestions, or collaboration, please open an issue in the repository.
