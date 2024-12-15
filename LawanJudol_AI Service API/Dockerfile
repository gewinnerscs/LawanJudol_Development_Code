# Use the official Python image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Install necessary packages
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg \
    unzip \
    libnss3 \
    libx11-6 \
    libxrender1 \
    libxext6 \
    libfontconfig1 \
    libx11-xcb1 \
    libdbus-glib-1-2 \
    chromium \
    chromium-driver

# Copy requirements.txt and install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application files
COPY . .

# Set environment variables for Chromium
ENV PATH="/usr/local/bin:/usr/bin/chromium:/usr/bin/chromium-driver:${PATH}"

# Expose the port
EXPOSE 8080

# Command to run the app
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app:app", "--bind", "0.0.0.0:8080", "--timeout", "300"]
