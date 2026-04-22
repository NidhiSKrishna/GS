#!/bin/bash
# AURA Project Startup Script
# This script starts both frontend and backend servers

echo "🚀 AURA – AI Identity Protection System"
echo "========================================\n"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Start Backend
echo -e "${BLUE}Starting Backend Server...${NC}"
cd backend
npm start &
BACKEND_PID=$!
echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}\n"

# Wait a moment for backend to start
sleep 2

# Start Frontend
echo -e "${BLUE}Starting Frontend Server...${NC}"
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID)${NC}\n"

echo -e "${YELLOW}════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Backend running on:  http://localhost:5000${NC}"
echo -e "${GREEN}✓ Frontend running on: http://localhost:5173${NC}"
echo -e "${YELLOW}════════════════════════════════════════${NC}\n"

echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

# Wait for both processes
wait
