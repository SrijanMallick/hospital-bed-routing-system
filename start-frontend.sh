#!/bin/bash

echo "========================================"
echo "Starting Hospital Triage Frontend"
echo "========================================"
echo ""

cd frontend
echo "Installing dependencies (if needed)..."
npm install
echo ""

echo "Starting development server on http://localhost:3000"
echo ""
npm run dev

