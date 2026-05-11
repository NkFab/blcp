#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "Starting BLCP..."
echo "Backend setup will run migrations and seeders before the API starts."

docker compose up --build
