# Adding New Videos to Gallery

## Quick Method: Manual Editing

1. **Add video files** to the `LINKS/` folder
2. **Edit `data.json`** - add your new entry at the **TOP** of the array:

```json
[
  {
    "movie": "https://remote-url.com/video.mp4",
    "local_movie": "/path/to/LINKS/your-new-video.mp4",
    "name": "Your New Character",
    "image": "https://remote-url.com/image.jpg",
    "local_image": "/path/to/LINKS/your-new-image.png",
    "timestamp": "2025-06-03T14:30:00.000Z",
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

3. **Refresh your browser** - new video appears at the top!

## Automatic Method: Helper Script

Use the helper script to add videos automatically:

```bash
# Run the example (modify add-video.js first)
npm run add-video

# Or use in your own script
node -e "
const { addVideoToTop } = require('./add-video.js');
addVideoToTop({
  name: 'New Character',
  local_movie: '/path/to/LINKS/video.mp4',
  local_image: '/path/to/LINKS/image.png',
  info: {
    performance: '95',
    style: '88',
    Fun: '92',
    technique: '89'
  }
});
"
```

## Timestamp Rules 📅

- **New entries at TOP** of data.json get the **NEWEST** timestamps
- **Automatic spacing**: Each entry is 5 minutes apart
- **Manual timestamps**: Add `"timestamp": "2025-06-03T14:30:00.000Z"` for exact timing
- **Gallery sorts by timestamp**: Newest first (top of data.json → top of gallery)

## File Naming Convention

For local files in LINKS folder:
- **Videos**: `CharacterName_YYYYMMDD-HHMMSS.mp4`
- **Images**: `CharacterName_YYYYMMDD-HHMMSS.png`

## Example: Adding a New Video

1. Copy files to LINKS:
   - `LINKS/NewHero_20250603-143000.mp4`
   - `LINKS/NewHero_20250603-143000.png`

2. Add to TOP of data.json:
```json
{
  "local_movie": "/Users/Richard/.../LINKS/NewHero_20250603-143000.mp4",
  "local_image": "/Users/Richard/.../LINKS/NewHero_20250603-143000.png", 
  "name": "New Hero",
  "info": {
    "performance": "98",
    "style": "92",
    "Fun": "95",
    "technique": "87"
  }
}
```

3. Refresh browser → New Hero appears at the top! 🎉

## Tips 💡

- **Always add to TOP** of data.json array for newest videos
- **No timestamp needed** - system generates automatically
- **Static mode**: Manual browser refresh required
- **Auto-update mode**: `npm run start-auto` for automatic refresh 