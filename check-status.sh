#!/bin/bash

echo "🔍 Gallery System Status Check"
echo "=============================="

# Check data tracker
DATA_TRACKER=$(ps aux | grep "data-tracker.js" | grep -v grep | wc -l)
if [ "$DATA_TRACKER" -gt 0 ]; then
    echo "✅ Data Tracker: Running (Auto-update mode)"
    ps aux | grep "data-tracker.js" | grep -v grep | head -1 | awk '{print "   PID:", $2}'
    GALLERY_MODE="Auto-update"
else
    echo "ℹ️  Data Tracker: Not Running (Static mode)"
    GALLERY_MODE="Static"
fi

# Check HTTP server
HTTP_SERVER=$(lsof -i :8080 | grep "Python.*LISTEN" | wc -l)
if [ "$HTTP_SERVER" -gt 0 ]; then
    echo "✅ HTTP Server: Running on port 8080"
    lsof -i :8080 | grep "Python.*LISTEN" | awk '{print "   PID:", $2}'
else
    echo "❌ HTTP Server: Not Running on port 8080"
fi

# Check if website is accessible
WEBSITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/index.html 2>/dev/null)
if [ "$WEBSITE_STATUS" = "200" ]; then
    echo "✅ Website: Accessible at http://localhost:8080/index.html"
else
    echo "❌ Website: Not accessible (HTTP $WEBSITE_STATUS)"
fi

# Check data files
if [ -f "data.json" ]; then
    VIDEOS_COUNT=$(node -e "try { const data = JSON.parse(require('fs').readFileSync('data.json', 'utf8')); console.log(data.length); } catch(e) { console.log('invalid'); }" 2>/dev/null)
    if [ "$VIDEOS_COUNT" != "invalid" ]; then
        echo "✅ Data File: $VIDEOS_COUNT videos in data.json"
    else
        echo "⚠️  Data File: data.json exists but has invalid JSON"
    fi
else
    echo "❌ Data File: data.json not found"
fi

# Check signal file
if [ -f "data-updated.signal" ]; then
    SIGNAL_TIME=$(cat data-updated.signal)
    echo "✅ Signal File: Last update at $SIGNAL_TIME"
else
    echo "❌ Signal File: data-updated.signal not found"
fi

# Gallery mode summary
echo ""
echo "📊 Gallery Mode: $GALLERY_MODE"
if [ "$GALLERY_MODE" = "Static" ]; then
    echo "   • No auto-updates"
    echo "   • Manual refresh needed for changes"
    echo "   • Lower resource usage"
else
    echo "   • Auto-updates enabled"
    echo "   • Polls for changes every 2 seconds"
fi

echo ""
echo "🌍 Access your gallery at: http://localhost:8080/index.html" 