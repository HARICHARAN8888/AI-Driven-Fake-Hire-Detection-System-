@echo off
setlocal enabledelayedexpansion

echo ===========================================================================
echo   AI-Driven Fake Hire Detection System - Identifying & Preventing Scams
echo ===========================================================================
echo.

:: 1. Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python not found. Please install Python from python.org
    pause
    exit /b
)
echo [OK] Python detected.

:: 2. Check for Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Node.js/npm not found. Frontend development requires Node.js.
    echo [INFO] You can still run the Backend and AI Agents.
) else (
    echo [OK] Node.js detected.
)

:: 3. Setup Backend
echo.
echo [1/3] Setting up Backend environment...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
echo Installing backend dependencies...
pip install -r requirements.txt
cd ..

:: 4. Setup AI Agents
echo.
echo [2/3] Setting up AI Agents...
:: (Uses the same venv as backend)
echo [OK] AI Agents ready.

:: 5. Setup Frontend (Optional based on Node)
node -v >nul 2>&1
if %errorlevel% eq 0 (
    echo.
    echo [3/3] Setting up Frontend...
    cd frontend
    echo Installing frontend dependencies (this may take a few minutes)...
    npm install
    cd ..
)

echo.
echo ======================================================
echo   SETUP COMPLETE!
echo ======================================================
echo.
echo To start the platform:
echo 1. Open 'start_backend.bat' to launch the API.
echo 2. Open 'start_frontend.bat' to launch the UI.
echo 3. Open 'start_agents.bat' to launch the AI Hunters.
echo.
pause
