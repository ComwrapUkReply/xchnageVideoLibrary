#!/bin/bash

echo "🔄 Restarting Data Gallery System..."

# Kill any existing processes
echo "🧹 Stopping existing services..."
pkill -f "data-tracker.js" 2>/dev/null
pkill -f "python3 -m http.server 8080" 2>/dev/null

# Wait a moment for cleanup
sleep 1

# Start the data gallery system
echo "🚀 Starting fresh instance..."
./start-data-gallery.sh 