@echo off
echo ========================================
echo   KnowledgeFlow Kit - Quick Install
echo ========================================
echo.

echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and run the installer.
    echo.
    pause
    exit /b 1
)

echo Node.js found! Version:
node --version
echo.

echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.
echo Starting the development server...
echo.
echo ========================================
echo   Your app will open at:
echo   http://localhost:5173
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
