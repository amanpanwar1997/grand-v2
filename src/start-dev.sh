#!/bin/bash

# Inchtomilez Development Environment Startup Script
# Starts both frontend and backend servers

echo "🚀 Starting Inchtomilez Admin Panel Development Environment"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Deno is installed
if ! command -v deno &> /dev/null; then
    echo "❌ Deno is not installed. Please install Deno first:"
    echo "   curl -fsSL https://deno.land/install.sh | sh"
    exit 1
fi

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "📡 Starting backend server..."
cd supabase/functions
deno run --allow-all --watch server/index.tsx &
BACKEND_PID=$!
cd ../..

echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
echo ""

# Wait for backend to initialize
echo "⏳ Waiting for backend to initialize..."
sleep 3

echo "🎨 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 Both servers are running!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}Frontend:${NC}  http://localhost:3000"
echo -e "${YELLOW}Backend:${NC}   http://localhost:8000"
echo -e "${YELLOW}Admin:${NC}     http://localhost:3000/admin"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Handle Ctrl+C gracefully
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped. Goodbye!"
    exit 0
}

trap cleanup INT TERM

# Wait for both processes
wait
