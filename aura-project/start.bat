@echo off
REM AURA Project Startup Script for Windows
REM This script starts both frontend and backend servers

echo.
echo ==================================================
echo. AURA - AI Identity Protection System
echo ==================================================
echo.

REM Start Backend
echo Starting Backend Server...
cd backend
start "AURA Backend" npm start
timeout /t 2 /nobreak

REM Start Frontend
echo Starting Frontend Server...
cd ../frontend
start "AURA Frontend" npm run dev

echo.
echo ==================================================
echo. Backend:  http://localhost:5000
echo. Frontend: http://localhost:5173
echo ==================================================
echo.
echo Servers are starting in new windows...
echo.
pause
