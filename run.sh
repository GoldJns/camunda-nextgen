#!/bin/bash

echo "Starting application"

echo "Making resolve_keycloak.sh executable..."
chmod +x resolve_keycloak.sh || { echo "Failed to set execute permission on resolve_keycloak.sh"; exit 1; }
./resolve_keycloak.sh
docker compose up -d
./run-backend.sh
./run-ui.sh
