# Data Gallery System

This project provides a video gallery that loads content from a curated `data.json` file with local video and image files. It supports both **static** and **auto-update** modes.

## System Overview

The **Data Gallery System** (`index.html`) offers two modes:

### 🔄 Auto-Update Mode (Default)
- **Live updates**: Automatically refreshes when data.json changes
- **Background tracker**: Monitors file changes
- **Instant updates**: No manual refresh needed when adding new videos
- **Real-time**: Polls every 2 seconds for changes

### 🏠 Static Mode (Optional)
- **Simple**: Just serves your video collection
- **No polling**: No constant requests or background processes
- **Low resource**: Only HTTP server running
- **Manual refresh**: Reload browser page to see changes

## Quick Start

### Auto-Update Gallery (Default)
```bash
# Install dependencies
npm install

# Start auto-update gallery
npm start

# Open browser to: http://localhost:8080/index.html
```

### Static Gallery (If Preferred)
```bash
# Start static gallery (no auto-updates)
npm run start-static

# Open browser to: http://localhost:8080/index.html
```

## Data Format

### data.json Structure
```json
[
  {
    "movie": "https://example.com/remote-video.mp4",
    "local_movie": "/path/to/LINKS/video.mp4",
    "name": "Character Name",
    "image": "https://example.com/remote-image.jpg",
    "local_image": "/path/to/LINKS/image.png",
    "info": {
      "performance": "95",
      "style": "88",
      "Fun": "92",
      "technique": "89"
    }
  }
]
```

**Note**: The system automatically uses local files from the `LINKS/` folder when available, falling back to remote URLs if needed.

## Features

- ✅ **Responsive Design**: Works on mobile, tablet, and desktop
- ✅ **Video Thumbnails**: Auto-playing video previews
- ✅ **Modal Overlay**: Full-screen video player with character stats
- ✅ **Animated Stats**: Progress bars with smooth counting animations
- ✅ **Timestamp Display**: Shows when videos were added
- ✅ **Load More**: Button-based pagination for large collections
- 📊 **Local File Priority**: Uses local LINKS files over remote URLs
- 🎯 **Curated Collections**: Full control over video metadata
- ⚡ **Static Mode**: No background processes or polling

## File Structure

```
📁 xchnageVideoLibrary/
├── 📄 index.html              # Data gallery viewer
├── 📄 styles.css              # Shared styles
├── 📊 data.json              # Static video metadata
├── 🔧 data-tracker.js        # Monitors data.json
├── 🚀 start-data-gallery.sh  # Launch data system
├── 🚀 restart-data-gallery.sh # Restart data system
├── 🔍 check-status.sh        # System status checker
├── 📦 package.json           # Dependencies
└── 📁 LINKS/                # Local video and image files
```

## Usage

### Adding Videos to Gallery

1. **Place files** in the `LINKS/` folder
2. **Add entry to TOP** of `data.json` array (this ensures it appears first in gallery):

```json
[
  {
    "movie": "https://remote-url.com/video.mp4",
    "local_movie": "/absolute/path/LINKS/filename.mp4",
    "name": "New Character", 
    "image": "https://remote-url.com/image.jpg",
    "local_image": "/absolute/path/LINKS/filename.png",
    "info": {
      "performance": "95",
      "style": "88",
      "Fun": "92", 
      "technique": "89"
    }
  },
  // ... existing videos below
]
```

3. **Gallery updates automatically** → New video appears at the top instantly! 🚀

### Automatic Timestamps 📅

- **Videos at TOP** of `data.json` get the **NEWEST** timestamps
- **Automatic spacing**: 5 minutes apart for proper sorting
- **Gallery sorts by timestamp**: Newest first (top of JSON → top of gallery)
- **No manual timestamps needed**: System generates them automatically
- **Auto-refresh**: Gallery updates within 2 seconds of file changes

## Available Commands

```bash
# Install dependencies
npm install

# Gallery modes  
npm start              # Auto-update gallery (default)
npm run start-auto     # Auto-update gallery (explicit)
npm run start-static   # Static gallery (no auto-updates)

# System management
npm run status         # Check system status
npm restart            # Restart auto-update system
npm run serve          # HTTP server only

# Development
npm run dev            # Auto-update with development tools
```

## Mode Comparison

| Feature | Auto-Update Mode | Static Mode |
|---------|------------------|-------------|
| **Resource Usage** | Higher (+ file watcher) | Low (HTTP only) |
| **Background Processes** | Data tracker | None |
| **Update Method** | Automatic (2 seconds) | Manual refresh |
| **Network Requests** | Continuous polling | Page load only |
| **Best For** | Active development | Stable collections |
| **Default** | ✅ Yes | No |

## Configuration

### Responsive Breakpoints
- **Mobile**: 320px - 767px (2 columns)
- **Tablet**: 768px - 1023px (3 columns)  
- **Desktop**: 1024px+ (4 columns)

### Load More Settings
- **Initial Load**: 16 videos
- **Load More**: 16 videos per click
- **Auto-scroll**: Smooth scroll to new content

## Troubleshooting

### Gallery Not Loading
1. Check system status: `npm run status`
2. Verify JSON file format with online validator
3. Check browser console for errors

### Videos Not Playing
1. Verify video file paths in data.json
2. Check video format compatibility (MP4 recommended)
3. Ensure HTTP server is running on port 8080

### Performance Issues
1. Use static mode instead of auto-update
2. Reduce `initialLoad` and `loadMore` values in index.html
3. Optimize video file sizes

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 80+

## License

MIT License - Feel free to modify and distribute! 