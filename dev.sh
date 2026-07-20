#!/bin/bash
echo "Starting Foxware Development Environment..."
echo ""

echo "Starting backend (NestJS)..."
(cd foxware/backend && npm run start:dev) &
BACKEND_PID=$!

echo "Starting frontend (Vite)..."
(cd foxware/frontend && npm run dev) &
FRONTEND_PID=$!

echo ""
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo "Swagger: http://localhost:3000/docs"
echo ""

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT
wait
