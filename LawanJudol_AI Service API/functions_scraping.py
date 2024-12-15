from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import urlparse

from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import undetected_chromedriver as uc
import socket
from google.cloud import storage
import os
import time

storage_client = storage.Client()

# Function to upload a file to Google Cloud Storage
def upload_to_gcs(bucket_name, source_file_name, destination_blob_name):

    blob = storage_client.bucket(bucket_name).blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(f"File {source_file_name} uploaded to {destination_blob_name}.")

def get_all_source(url, filename):
    options = uc.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-setuid-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("start-maximized")
    options.add_argument("--incognito")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.109 Safari/537.36"
    )

    #service = Service('/usr/bin/chromedriver')  # Point directly to the installed driver
    service = Service(ChromeDriverManager().install())

    driver = webdriver.Chrome(service=service, options=options)
    socket.setdefaulttimeout(180)

    try:
        driver.set_page_load_timeout(180)
        driver.get(url)
        #time.sleep(5)
        cookies = driver.get_cookies()
        WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))

        # Handle JavaScript Alerts
        try:
            WebDriverWait(driver, 10).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert.dismiss()  # Close the alert
        except Exception as e:
            print(e)

        # Adjust the window size to match the full page height
        page_width = driver.execute_script("return document.body.scrollWidth")
        page_height = driver.execute_script("return document.body.scrollHeight")
        driver.set_window_size(page_width, page_height)

        # Take a full-page screenshot
        driver.save_screenshot(filename)
        print("Screenshot taken")

        # Upload the screenshot to Google Cloud Storage
        bucket_name = 'lawanjudol-image'
        destination_blob_name = filename
        upload_to_gcs(bucket_name, filename, destination_blob_name)

        # Get body text
        body_text = driver.find_element(By.TAG_NAME, "body").text
        title = driver.title

        print(f"Full-page screenshot uploaded to {bucket_name}/{destination_blob_name}")
        return body_text, title, destination_blob_name
    finally:
        driver.quit()

def clean_website_name(url):
    # Parse the URL
    parsed_url = urlparse(url)

    # Extract the domain and path
    domain = parsed_url.netloc.replace("www.", "")  # Remove "www."
    path = parsed_url.path.strip("/")  # Remove leading/trailing slashes

    # Combine domain and path, replacing special characters with "_"
    combined = f"{domain}/{path}" if path else domain
    cleaned = combined.replace("/", "_").replace("-", "_")

    return cleaned