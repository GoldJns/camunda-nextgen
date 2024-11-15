#!/bin/bash

echo "Starting Docker Compose stack..."

docker compose up init zeebe operate identity postgres keycloak elasticsearch -d
