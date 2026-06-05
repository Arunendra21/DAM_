#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔧 Starting Backend Server...${NC}"
echo ""

# Kill any existing backend processes
pkill -9 "node.*server" 2>/dev/null || true
pkill -9 "npm.*dev" 2>/dev/null || true
sleep 2

# Check if port 8080 is in use
if lsof -i :8080 2>/dev/null | grep -q LISTEN; then
    echo -e "${YELLOW}⚠️  Port 8080 in use, killing old process...${NC}"
    lsof -ti :8080 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Start backend
cd "$(dirname "$0")/backend"
echo -e "${GREEN}✅ Backend starting on port 8080${NC}"
echo ""
npm run dev
