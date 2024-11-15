#!/bin/bash

echo "Starting application"

echo "Making resolve_keycloak.sh executable..."
chmod +x resolve_keycloak.sh || { echo "Failed to set execute permission on resolve_keycloak.sh"; exit 1; }
./resolve_keycloak.sh
./run-docker.sh
./run-backend.sh
./run-ui.sh
