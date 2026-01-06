@echo off
echo ========================================
echo Starting Hospital Triage Backend Server
echo ========================================
echo.

cd backend
echo Installing dependencies (if needed)...
call npm install
echo.

echo Starting server on http://localhost:3001
echo.
call npm start

