# Auto-Updating Video Gallery

A dynamic video gallery that automatically detects and displays new videos added to the `videos` folder with real-time updates and smooth animations.

## Features

✨ **Auto-Detection**: Automatically detects new video files added to the videos folder
📱 **Responsive Design**: Works on desktop, tablet, and mobile devices  
🎬 **Video Modal**: Click videos to view in full-screen modal with character info
⚡ **Real-time Updates**: Gallery updates without page refresh when new videos are added
📊 **Animated Stats**: Performance metrics animate with progress bars and golden glow effects
⏰ **Smart Timestamps**: Shows precise hours and minutes for recent videos
🎯 **Smooth Scrolling**: Auto-scroll to reveal newly loaded content

## Setup Instructions

### 1. Install Dependencies

`npm install`

### 2. Start the File Watcher

`npm start`

This will:
- Monitor the `videos/` folder for new video files
- Automatically update `videos.json` when changes are detected
- Generate character names and stats for new videos
- Create timestamps for proper sorting

### 3. Start the Web Server

In a new terminal window:

`npm run serve`

Then open: `http://localhost:8080`

## How It Works

### File Watcher (`video-watcher.js`)
- Monitors the `videos/` folder using `chokidar`
- Supports formats: `.mp4`, `.mov`, `.avi`, `.mkv`, `.webm`
- Auto-generates character names from filenames or random pool
- Creates performance stats (Speed, Strength, Defense, Magic, Agility, Intelligence)
- Maintains newest-first sorting with ISO timestamps

### Web Interface (`VideoViewer.html`)
- Loads 16 videos initially, then 16 more per "Load More" click
- Checks for updates every 2 seconds via signal file
- Auto-refreshes gallery when new videos are detected
- Smooth scroll animation to reveal new content
- Enhanced timestamp display with hours and minutes

### Timestamp Display
- **Just now**: Less than 1 minute
- **5m ago**: Less than 1 hour  
- **2h 15m ago**: Less than 24 hours
- **3d 5h ago**: Less than 7 days
- **12/25/2023 14:30**: Older videos show full date and time

## Adding New Videos

Simply copy video files into the `videos/` folder:

1. **Copy video file**: `cp new-video.mp4 videos/`
2. **Watch console**: The watcher will detect and process it
3. **Check gallery**: Refresh automatically in browser (no manual reload needed)

## File Structure

```
project/
├── videos/                 # Video files folder (watched)
├── images/                 # Character card images  
├── VideoViewer.html       # Main gallery interface
├── styles.css             # Responsive styling
├── videos.json            # Auto-generated video database
├── video-watcher.js       # File monitoring script
├── videos-updated.signal  # Update notification file
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Supported Video Formats

- **MP4** (recommended)
- **MOV** (Apple format)
- **AVI** (classic format)
- **MKV** (high quality)
- **WebM** (web optimized)

## Character Name Generation

The system intelligently generates character names:

1. **From filename**: Cleans and capitalizes meaningful filenames
2. **Random pool**: Uses curated fantasy character names
3. **Unique guarantee**: Ensures no duplicate names

## Performance Stats

Each video gets random performance metrics (60-100):
- **Speed**: Movement and reaction time
- **Strength**: Physical power and damage
- **Defense**: Resistance and armor
- **Magic**: Magical abilities and mana
- **Agility**: Dexterity and evasion  
- **Intelligence**: Strategy and wisdom

## Troubleshooting

### Gallery not updating?
- Check that `video-watcher.js` is running
- Verify video files are in correct format
- Check console for error messages

### Scroll not working?
- Ensure CSS `min-height: 100%` is set on html/body
- Check browser console for JavaScript errors

### Videos not loading?
- Verify HTTP server is running on port 8080
- Check that video files exist in videos folder
- Ensure proper file permissions

## Development

To modify character names, edit the `CHARACTER_NAMES` array in `video-watcher.js`.

To change update frequency, modify the interval in `VideoViewer.html` (currently 2 seconds).

To add new video formats, update `VIDEO_EXTENSIONS` array in `video-watcher.js`. 