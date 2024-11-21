#!/bin/bash

echo "Adding keycloak entry to hosts file..."

# Detect OS and perform the required action based on the detected OS.
if [[ "$OSTYPE" == "linux"* || "$OSTYPE" == "darwin"* ]]; then
    # Linux or macOS case
    HOSTS_FILE="/etc/hosts"
    if ! grep -q "127.0.0.1 keycloak" "$HOSTS_FILE"; then
        echo "Adding entry to $HOSTS_FILE"
        sudo sh -c "echo '127.0.0.1 keycloak' >> $HOSTS_FILE"
    else
        echo "Entry already exists in $HOSTS_FILE"
    fi

elif [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "cygwin"* || "$OSTYPE" == "win32" ]]; then
    # Windows case, using PowerShell to edit the hosts file
    HOSTS_FILE="C:\\Windows\\System32\\drivers\\etc\\hosts"
    if ! grep -q "127.0.0.1 keycloak" "$HOSTS_FILE"; then
        echo "Adding entry to $HOSTS_FILE"
        "/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe" -Command "Add-Content -Path '$HOSTS_FILE' -Value '127.0.0.1 keycloak'"
    else
        echo "Entry already exists in $HOSTS_FILE"
    fi

else
    echo "Unsupported OS."
    exit 1
fi

echo "Script execution complete."
