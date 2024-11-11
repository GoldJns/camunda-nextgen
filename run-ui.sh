#!/bin/bash

echo "Navigating to src/ui..."
cd src/ui|| { echo "Directory src/ui not found!"; exit 1; }

npm install && npm run dev
