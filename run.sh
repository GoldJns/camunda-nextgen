#!/bin/bash

echo "Starting application"
./run-docker.sh & ./run-backend.sh & ./run-ui.sh