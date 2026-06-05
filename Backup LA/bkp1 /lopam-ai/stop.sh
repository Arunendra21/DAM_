#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🛑 Stopping all servers...${NC}"
echo ""

# Kill all node and npm processes
pkill -9 node 2>/dev/null
pkill -9 npm 2>/dev/null

sleep 1

# Verify they're stopped
if ! pgrep -f "node\|npm" > /dev/null; then
    echo -e "${GREEN}✅ All servers stopped${NC}"
else
    echo -e "${RED}⚠️  Some processes still running${NC}"
    echo "Run: pkill -9 node && pkill -9 npm"
fi

echo ""
