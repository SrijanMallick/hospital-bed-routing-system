#!/bin/bash

echo "========================================"
echo "Starting Hospital Triage Backend Server"
echo "========================================"
echo ""

cd backend
echo "Installing dependencies (if needed)..."
npm install
echo ""

echo "Starting server on http://localhost:3001"
echo ""
npm start

