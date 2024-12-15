# LawanJudol AI Service API

## Overview
A FastAPI-based service that analyzes websites to detect and classify illegal gambling, phishing, and inappropriate content using Google's Generative AI.

## Features
- Website analysis and classification
- Screenshot capture and storage
- Twitter content analysis
- Integration with Google Cloud services
  - Gemini AI for content analysis
  - Cloud Storage for screenshots
  - BigQuery for logging results

## Tech Stack
- Python 3.10
- FastAPI
- Google Cloud Services
- Selenium with undetected-chromedriver
- Docker

## Prerequisites
- Python 3.10+
- Google Cloud Platform account
- Google Cloud credentials
- Docker (optional)

## Installation
1. Install dependencies:
cd LawanJudol_AI_Service_API
pip install -r requirements.txt

2. Set environment variables:
export GOOGLE_APPLICATION_CREDENTIALS="path/to/credentials.json"

3. Run the API:
uvicorn app:app --host 0.0.0.0 --port 8080

### Frontend Setup

1. Install dependencies:
bash
cd LawanJudol_Frontend_Main
npm install

2. Run development server:
npm run dev

Visit http://localhost:3000 to view the application.

## API Endpoints

### Health Check
```
GET /health
Response: { "status": "ok" }
```

### URL Analysis
```
POST /checking/url
Body: { "url": "string" }
```

### Twitter Content Analysis
```
POST /checking/twitter
Body: { "tweet": "string" }
```

### Response Format
```json
{
    "url": "string",
    "gcs_image_path": "string",
    "website_category": "string",
    "confidence_level": "string",
    "analysis": "string"
}
```

## Docker Deployment

### Backend
```bash
cd LawanJudol_AI_Service_API
docker build -t lawanjudol-api .
docker run -p 8080:8080 lawanjudol-api
```

### Frontend
```bash
cd LawanJudol_Frontend_Main
docker build -t lawanjudol-frontend .
docker run -p 3000:3000 lawanjudol-frontend
```

## Project Structure

```
LawanJudol/
├── AI_Service_API/
│   ├── app.py                 # FastAPI application
│   ├── functions_genai.py     # AI analysis functions
│   ├── functions_scraping.py  # Web scraping utilities
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile            # Container configuration
│
└── Frontend_Main/
    ├── src/
    │   ├── app/              # Next.js pages
    │   ├── components/       # React components
    │   └── lib/             # Utility functions
    ├── public/              # Static assets
    └── package.json         # Project dependencies
```

## Environment Variables

### Backend
- `GOOGLE_APPLICATION_CREDENTIALS`: Google Cloud credentials path
- `GENAI_API_KEY`: Google Generative AI API key

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API URL

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request