@echo off
echo ========================================
echo   Upload KnowledgeFlow Kit to GitHub
echo ========================================
echo.

echo Checking for Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo Git found! Version:
git --version
echo.

echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit - Enhanced KnowledgeFlow Kit with AI features, animations, and advanced UI"

echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Go to https://github.com/new
echo 2. Create a new repository named 'knowledgeflow-kit-enhanced'
echo 3. Copy the repository URL
echo 4. Run these commands:
echo.
echo    git remote add origin YOUR_REPOSITORY_URL
echo    git branch -M main
echo    git push -u origin main
echo.
echo ========================================
echo   Your enhanced KnowledgeFlow Kit is ready!
echo ========================================
echo.
pause
