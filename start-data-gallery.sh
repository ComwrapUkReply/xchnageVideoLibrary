#!/bin/bash

echo "🚀 Starting Data Gallery System..."

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "data-tracker.js" 2>/dev/null
pkill -f "python3 -m http.server 8080" 2>/dev/null

# Start the data tracker in the background
echo "📊 Starting data tracker..."
node data-tracker.js &
TRACKER_PID=$!

# Wait a moment for tracker to initialize
sleep 2

# Start the HTTP server in the background
echo "🌐 Starting HTTP server on port 8080..."
python3 -m http.server 8080 &
SERVER_PID=$!

# Show status
echo ""
echo "✅ Data Gallery System Started!"
echo "📊 Data Tracker PID: $TRACKER_PID"
echo "🌐 HTTP Server PID: $SERVER_PID"
echo ""
echo "🌍 Open your browser to: http://localhost:8080/index.html"
echo ""
echo "🔄 The gallery will automatically update when you modify data.json"
echo ""
echo "⏹️  Press Ctrl+C to stop both services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $TRACKER_PID 2>/dev/null
    kill $SERVER_PID 2>/dev/null
    echo "✅ Services stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to press Ctrl+C
while true; do
    sleep 1
done 