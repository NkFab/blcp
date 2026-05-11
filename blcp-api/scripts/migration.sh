#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: Migration name is required"
  exit 1
fi

pnpm typeorm migration:create "src/database/migration/$1"