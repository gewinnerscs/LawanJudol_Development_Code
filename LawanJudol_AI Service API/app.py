from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
from functions_genai import twitter_checking, url_checking
import os

# Initialize the FastAPI app
app = FastAPI()

# Define request models
class TwitterRequest(BaseModel):
    tweet: str

class URLRequest(BaseModel):
    url: str

# Define response models
class URLResponse(BaseModel):
    url: str
    gcs_image_path: str
    website_category: str
    confidence_level: str
    analysis: str

#os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "ai4impact-444313-3382ac51e6e3.json"

# Health check route
@app.get("/health")
def health_check():
    return {"status": "ok"}

# API route for Twitter checking
@app.post("/checking/twitter", response_model=URLResponse)
def check_twitter(request: TwitterRequest):
    try:
        # Process the tweet and check for URLs
        result = twitter_checking(request.tweet)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# API route for URL checking
@app.post("/checking/url", response_model=URLResponse)
def check_url(request: URLRequest):
    try:
        # Process the URL and analyze the website
        result = url_checking(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the app if executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
