@echo off
echo ========================================
echo Starting Hospital Triage Frontend
echo ========================================
echo.

cd frontend
echo Installing dependencies (if needed)...
call npm install
echo.

echo Starting development server on http://localhost:3000
echo.
call npm run dev

