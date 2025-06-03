# Data Gallery System

This project provides an auto-updating video gallery that loads content from a curated `data.json` file with local video and image files.

## System Overview

The **Data Gallery System** (`index.html`) uses:
- **Data Source**: `data.json` - Static JSON file with video metadata
- **Local Files**: `LINKS/` folder containing video and image files  
- **Tracker**: `data-tracker.js` - Monitors `data.json` for changes
- **Perfect for**: Pre-defined video collections with metadata and local file management

## Quick Start

```bash
# Install dependencies
npm install

# Start the data gallery system
npm start

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

- ✅ **Auto-refresh**: Page updates automatically when data.json changes
- ✅ **Responsive Design**: Works on mobile, tablet, and desktop
- ✅ **Video Thumbnails**: Auto-playing video previews
- ✅ **Modal Overlay**: Full-screen video player with character stats
- ✅ **Animated Stats**: Progress bars with smooth counting animations
- ✅ **Timestamp Display**: Shows when videos were added
- ✅ **Load More**: Button-based pagination for large collections
- 📊 **Local File Priority**: Uses local LINKS files over remote URLs
- 🎯 **Curated Collections**: Full control over video metadata

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
1. Place video and image files in the `LINKS/` folder
2. Edit `data.json` to add metadata:
```json
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
}
```
3. Gallery updates automatically!

**Note**: The system extracts filenames from `local_movie` and `local_image` paths and looks for them in the `LINKS/` folder.

## Available Commands

```bash
# Install dependencies
npm install

# Start systems
npm start           # Data gallery system
npm restart         # Restart data gallery system
npm status          # Check system status

# Development
npm run dev         # Data gallery with auto-restart

# Individual components
npm run data-tracker    # Start data tracker only
npm run serve          # Start HTTP server only
```

## Configuration

### Responsive Breakpoints
- **Mobile**: 320px - 767px (2 columns)
- **Tablet**: 768px - 1023px (3 columns)  
- **Desktop**: 1024px+ (4 columns)

### Load More Settings
- **Initial Load**: 16 videos
- **Load More**: 16 videos per click
- **Auto-scroll**: Smooth scroll to new content

### Update Intervals
- **Data Tracker**: Monitors file changes in real-time
- **Browser Update**: Checks for changes every 2 seconds

## Troubleshooting

### Gallery Not Updating
1. Check if tracker is running: `npm status`
2. Verify JSON file format with online validator
3. Check browser console for errors

### Videos Not Playing
1. Verify video file paths in data.json
2. Check video format compatibility (MP4 recommended)
3. Ensure HTTP server is running on port 8080

### Performance Issues
1. Reduce `initialLoad` and `loadMore` values in index.html
2. Optimize video file sizes
3. Use lower resolution for thumbnail previews

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 80+

## License

MIT License - Feel free to modify and distribute! 