@echo off
echo === Testing Production Environment ===

echo.
echo 1. Building for production...
call npm run build:prod

if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo 2. Starting production preview server...
echo 📱 Open http://localhost:4173 in your browser
echo 🛑 Press Ctrl+C to stop the server
echo.

call npm run preview:prod