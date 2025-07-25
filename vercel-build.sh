#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Fix permissions
echo "Fixing permissions..."
chmod +x node_modules/.bin/vite

# Build the project
echo "Building project..."
npx vite build

# Verify build
if [ -d "dist" ]; then
  echo "Build successful!"
  exit 0
else
  echo "Build failed: dist directory not found"
  exit 1
fi
