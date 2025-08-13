#!/bin/bash
set -e

echo "=== Production Deployment ==="
echo "Building for production..."

# Clean previous build
rm -rf dist/

# Install dependencies
npm ci

# Build for production
npm run build

echo "✅ Production build complete!"
echo "📁 Build files are in ./dist/"
echo "🚀 Ready for deployment"