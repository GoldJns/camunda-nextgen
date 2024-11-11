#!/bin/bash

echo "Starting docker compose stack..."

docker compose up init db zeebe operate identity postgres keycloak opensearch 