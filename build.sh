#!/bin/bash
set -e  # Exit on error

echo "=== Starting build process ==="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
echo -e "\n=== Installing dependencies ==="
npm install --force

# Verify critical modules
echo -e "\n=== Verifying modules ==="
ls -la node_modules/tailwindcss || echo "Tailwind CSS not found"
ls -la node_modules/postcss || echo "PostCSS not found"
ls -la node_modules/autoprefixer || echo "Autoprefixer not found"

# Build the project
echo -e "\n=== Building project ==="
npm run build

echo -e "\n=== Build completed successfully ==="
ls -la dist/