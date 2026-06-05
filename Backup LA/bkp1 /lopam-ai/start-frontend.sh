#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}📱 Starting Frontend Server...${NC}"
echo ""

# Kill any existing frontend processes
pkill -9 "next" 2>/dev/null || true
sleep 2

# Start frontend
cd "$(dirname "$0")/frontend"
echo -e "${GREEN}✅ Frontend starting on port 3000${NC}"
echo ""
npm run dev
