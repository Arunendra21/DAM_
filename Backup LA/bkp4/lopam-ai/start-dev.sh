#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  LOPAM AI - Development Server Setup   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Kill any existing processes
echo -e "${YELLOW}[1/4] Cleaning up old processes...${NC}"
pkill -9 node 2>/dev/null || true
pkill -9 npm 2>/dev/null || true
sleep 2

echo -e "${GREEN}✅ Cleaned up${NC}"
echo ""

# Start Backend
echo -e "${YELLOW}[2/4] Starting Backend Server (port 8080)...${NC}"
cd "$(dirname "$0")/backend"
npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
sleep 4

# Check backend
if curl -s http://localhost:8080/health > /dev/null; then
    echo -e "${GREEN}✅ Backend running on port 8080${NC}"
else
    echo -e "${YELLOW}⚠️  Backend starting... (check /tmp/backend.log if issues)${NC}"
fi

echo ""

# Start Frontend
echo -e "${YELLOW}[3/4] Starting Frontend Server (port 3000)...${NC}"
cd "$(dirname "$0")/frontend"
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 4

echo -e "${GREEN}✅ Frontend starting... (will be ready in ~10 seconds)${NC}"

echo ""
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          🚀 SERVERS RUNNING 🚀         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}📱 Frontend:${NC}  http://localhost:3000"
echo -e "${GREEN}🔧 Backend:${NC}   http://localhost:8080"
echo -e "${GREEN}📊 Health:${NC}    http://localhost:8080/health"
echo ""
echo -e "${YELLOW}Quick Login:${NC}"
echo "  Email:    admin@lopam.ai"
echo "  Password: Admin@123456"
echo ""
echo -e "${YELLOW}View Logs:${NC}"
echo "  Backend:  tail -f /tmp/backend.log"
echo "  Frontend: tail -f /tmp/frontend.log"
echo ""
echo -e "${YELLOW}Stop Servers:${NC}"
echo "  Press Ctrl+C or run: pkill -f 'node\\|npm'"
echo ""

# Wait for user interrupt
wait
