import json
from functions_scraping import *
import google.generativeai as genai
from PIL import Image
import io
import datetime
from google.cloud import bigquery, storage
from typing import List

bq_client = bigquery.Client()
gcs_client = storage.Client()

genai.configure(api_key='XXX')

def url_identification(obj, obj_type: str):
    
    model = genai.GenerativeModel(
      model_name = "gemini-1.5-flash",
      generation_config = {
        "temperature": 0.1,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 200,
        "response_mime_type": "application/json",
      },
    )

    if obj_type == 'text':
        # For text, use Google Generative AI to identify URLs
        prompt = [
            f"""
            Provide suspicious link highly likely to be Online Gambling / Phising / Porn websites from this tweet or text below:
            {obj}
            Generate the link in a json format with json name url
            """
        ]

        # Generate content
        response = model.generate_content(prompt)

        # Parse JSON string
        url = json.loads(response.text)['url']

    elif obj_type == 'image':
      url = ''

    elif obj_type == 'video':
      url = ''

    return url

def log_to_bigquery(check_result):
    """Logs the website check results to BigQuery."""
    try:

        row_to_insert = {
            "url": check_result['url'],
            "gcs_image_path": check_result['gcs_image_path'],
            "website_category": check_result['website_category'],
            "confidence_level": check_result['confidence_level'],
            "analysis": check_result['analysis'],
            "timestamp": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S.%f%z") # Add timestamp
        }

        errors = bq_client.insert_rows_json(bq_client.get_table("lawanjudol.lawanjudol_api_log"), [row_to_insert])  # Insert as a list of dictionaries

        if errors == []:
            print(f"Successfully logged data to BigQuery for URL: {check_result['url']}")
        else:
            print(f"Encountered errors while inserting rows: {errors}")

    except Exception as e:
        print(f"Error logging to BigQuery: {e}")

def url_checking(url):
    print(f"Start checking URL: {url}")

    filename = clean_website_name(url)+".png"

    try:
        text, title, gcs_blob_path = get_all_source(url, filename)
        print("Website successfully scraped")
    except Exception as e:
        print(e)
        print("We will work on development further")

    model = genai.GenerativeModel(
        model_name = "gemini-1.5-flash",
        generation_config = {
        "temperature": 0.1,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 10000,
        "response_mime_type": "application/json",
        },
    )

    image_bytes = gcs_client.bucket('lawanjudol-image').blob(gcs_blob_path).download_as_bytes()

    prompt = [
        """
        Analyze the category of the following website with a focus on identifying **Illegal Gambling** activities.  
        Differentiate between websites facilitating unauthorized gambling and legitimate websites, such as news or informational sites discussing gambling-related topics.  

        Classify the website into one of these categories:
        - **Illegal Gambling**: Websites facilitating unauthorized gambling activities (e.g., betting, online casinos, lotteries without proper licenses).  
        - **Phishing**: Websites designed to fraudulently obtain sensitive information (e.g., fake login pages, deceptive forms).  
        - **Porn**: Websites focus on featuring explicit adult content.  
        - **Normal**: Websites without malicious or inappropriate content, serving legitimate purposes, including news or informational content discussing gambling.  

        Additional Guidance:
        - **Contextual Clues**: Legitimate news or informational sites may discuss gambling but will not include interactive elements (e.g., betting interfaces, sign-up options for gambling) or promotional content encouraging gambling activities.  
        - **Content Intent**: Evaluate whether the intent of the website is informational or transactional in nature (e.g., facilitating bets, promoting gambling services).  

        Confidence Levels for Classification:  
        - **High**: The content strongly aligns with one category, with no ambiguity.  
        - **Medium**: The content partially aligns with a category but shows some ambiguity.  
        - **Low**: Insufficient data or high ambiguity makes the classification uncertain.  

        Input for Analysis:  
        ```
        Website Title: """ + title + """
        Content:
        """ + text + """
        ```
        

        Output Format (JSON):  
        {
            "Website Category": "Illegal Gambling/Phishing/Porn/Normal",
            "Confidence Level": "Low/Medium/High",
            "Analysis": "{Provide concise reasoning, no more than 100 words, highlighting factors such as interactive elements, promotional intent, or lack thereof.}"
        }
        """,
        Image.open(io.BytesIO(image_bytes))
    ]



    # Generate content
    response = model.generate_content(prompt)

    # Parse JSON string
    parsed_data = json.loads(response.text)

    api_response = {
        'url': url,
        'gcs_image_path': f"https://storage.googleapis.com/lawanjudol-image/{gcs_blob_path}",
        'website_category': parsed_data['Website Category'],
        'confidence_level': parsed_data['Confidence Level'],
        'analysis': parsed_data['Analysis'],
    }

    log_to_bigquery(api_response)

    return api_response

def twitter_checking(tweet):
   
  url = url_identification(tweet, 'text')

  return url_checking(url)