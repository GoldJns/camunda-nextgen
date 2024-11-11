#!/bin/bash

# Navigate to the health-management directory
echo "Navigating to src/health-management..."
cd src/health-management || { echo "Directory src/health-management not found!"; exit 1; }

# Run Maven build using exec to replace the current process
echo "Running Maven build..."
mvn clean package -DskipTests || { echo "Maven build failed!"; exit 1; }

# Once the Maven build finishes, run Spring Boot using exec
echo "Starting Spring Boot application..."
mvn spring-boot:run || { echo "Spring Boot application failed to start!"; exit 1; }
