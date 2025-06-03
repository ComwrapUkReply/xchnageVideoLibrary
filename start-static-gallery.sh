#!/bin/bash

echo "🚀 Starting Static Gallery System..."

# Kill any existing HTTP server processes
echo "🧹 Cleaning up existing HTTP server..."
pkill -f "python3 -m http.server 8080" 2>/dev/null

# Wait a moment for cleanup
sleep 1

# Start the HTTP server
echo "🌐 Starting HTTP server on port 8080..."
python3 -m http.server 8080 &
SERVER_PID=$!

# Show status
echo ""
echo "✅ Static Gallery System Started!"
echo "🌐 HTTP Server PID: $SERVER_PID"
echo ""
echo "🌍 Open your browser to: http://localhost:8080/index.html"
echo ""
echo "ℹ️  This is a static gallery - no auto-updates"
echo ""
echo "⏹️  Press Ctrl+C to stop"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping HTTP server..."
    kill $SERVER_PID 2>/dev/null
    echo "✅ Server stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to press Ctrl+C
while true; do
    sleep 1
done 