#!/bin/bash

# Load environment variables from the .env file
if [ -f ".env" ]; then
  echo "Loading environment variables from .env file..."
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found. Proceeding without loading environment variables."
fi

# Wait for Docker containers to become healthy
echo "Waiting for Docker containers to become healthy..."

max_attempts=30
attempts=0

# Check container health status
while ! docker compose ps | grep -q "healthy"; do
  attempts=$((attempts + 1))
  if [ $attempts -ge $max_attempts ]; then
    echo "Docker containers did not become healthy in time. Exiting..."
    exit 1
  fi
  echo "Attempt $attempts/$max_attempts: Waiting for containers..."
  sleep 2
done

# Wait an additional 30 seconds after containers are healthy
echo "Containers are healthy. Waiting an additional 30 seconds to ensure readiness..."
sleep 30

# Navigate to the health-management directory
echo "Navigating to src/health-management..."
cd src/health-management || { echo "Directory src/health-management not found!"; exit 1; }

# Run Maven build
echo "Running Maven build..."
mvn clean package -DskipTests || { echo "Maven build failed!"; exit 1; }

# Start Spring Boot application
echo "Starting Spring Boot application..."
mvn spring-boot:run || { echo "Spring Boot application failed to start!"; exit 1; }
