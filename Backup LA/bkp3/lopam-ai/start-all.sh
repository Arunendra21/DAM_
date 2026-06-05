#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}   LOPAM AI - START BOTH SERVERS${NC}"
echo -e "${YELLOW}========================================${NC}\n"

# Step 1: Kill all existing processes
echo -e "${YELLOW}[1/4] Killing any existing Node processes...${NC}"
pkill -9 -f "node" 2>/dev/null || true
pkill -9 -f "npm" 2>/dev/null || true
sleep 3

# Step 2: Verify ports are free
echo -e "${YELLOW}[2/4] Verifying ports are free...${NC}"
if lsof -i :8080 2>/dev/null | grep -q LISTEN; then
    echo -e "${RED}❌ Port 8080 is still in use! Force clearing...${NC}"
    lsof -ti :8080 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

if lsof -i :3000 2>/dev/null | grep -q LISTEN; then
    echo -e "${RED}❌ Port 3000 is still in use! Force clearing...${NC}"
    lsof -ti :3000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

echo -e "${GREEN}✅ All ports are clear${NC}\n"

# Step 3: Start Backend
echo -e "${YELLOW}[3/4] Starting Backend Server on port 8080...${NC}"
cd "$(dirname "$0")/backend"
npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"

# Wait for backend to start
sleep 4

# Verify backend is running
if curl -s http://localhost:8080/health | jq . > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is responding to requests${NC}\n"
else
    echo -e "${RED}❌ Backend failed to start! Check /tmp/backend.log${NC}"
    cat /tmp/backend.log
    exit 1
fi

# Step 4: Start Frontend
echo -e "${YELLOW}[4/4] Starting Frontend Server on port 3000...${NC}"
cd "$(dirname "$0")"
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"

# Wait for frontend to start
sleep 4

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}   ✅ ALL SERVERS STARTED SUCCESSFULLY${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "📱 Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "🔧 Backend:  ${GREEN}http://localhost:8080${NC}"
echo -e "📊 Health:   ${GREEN}http://localhost:8080/health${NC}\n"

echo -e "${YELLOW}Quick Test Login:${NC}"
echo -e "  Email:    admin@lopam.ai"
echo -e "  Password: Admin@123456\n"

echo -e "${YELLOW}Logs:${NC}"
echo -e "  Backend:  tail -f /tmp/backend.log"
echo -e "  Frontend: tail -f /tmp/frontend.log\n"

echo -e "${YELLOW}To stop all servers:${NC}"
echo -e "  pkill -f 'node\\|npm'\n"

# Keep script running
wait
