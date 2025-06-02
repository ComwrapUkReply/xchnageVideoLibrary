const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const VIDEOS_FOLDER = './videos';
const VIDEOS_JSON_PATH = './videos.json';

// Video file extensions to watch for
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];

// Character name pool for new videos
const CHARACTER_NAMES = [
  'Crimson Warrior', 'Azure Sentinel', 'Emerald Knight', 'Golden Phoenix', 
  'Silver Storm', 'Violet Mystic', 'Obsidian Guardian', 'Iron Colossus',
  'Plasma Ranger', 'Neon Specter', 'Cyber Ninja', 'Frost Assassin',
  'Solar Flare', 'Lunar Eclipse', 'Thunder God', 'Storm Bringer',
  'Celestial Wing', 'Shadow Blade', 'Crystal Mage', 'Fire Dancer',
  'Ice Queen', 'Wind Walker', 'Earth Shaker', 'Lightning Strike',
  'Dark Phantom', 'Bright Angel', 'Mystic Sage', 'Warrior Spirit',
  'Dragon Heart', 'Phoenix Rising', 'Star Guardian', 'Moon Shadow',
  'Solar Beam', 'Thunder Bolt', 'Fire Storm', 'Ice Blade',
  'Wind Spirit', 'Earth Guardian', 'Water Nymph', 'Air Elemental'
];

/**
 * Generate a unique character name for a new video
 */
function generateCharacterName(existingVideos, videoFileName) {
  // Extract name from filename if possible
  const baseName = path.basename(videoFileName, path.extname(videoFileName));
  const cleanName = baseName.replace(/[-_]/g, ' ').replace(/\d+/g, '').trim();
  
  if (cleanName.length > 3) {
    // Use cleaned filename if it's meaningful
    return cleanName.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }
  
  // Otherwise use a random character name
  const usedNames = existingVideos.map(v => v.name);
  const availableNames = CHARACTER_NAMES.filter(name => !usedNames.includes(name));
  
  if (availableNames.length > 0) {
    return availableNames[Math.floor(Math.random() * availableNames.length)];
  }
  
  // If all names are used, add a number
  return `${CHARACTER_NAMES[Math.floor(Math.random() * CHARACTER_NAMES.length)]} ${Date.now()}`;
}

/**
 * Generate random performance stats for a new video
 */
function generatePerformanceStats() {
  return [
    `Speed: ${Math.floor(Math.random() * 41) + 60}`,
    `Strength: ${Math.floor(Math.random() * 41) + 60}`,
    `Defense: ${Math.floor(Math.random() * 41) + 60}`,
    `Magic: ${Math.floor(Math.random() * 41) + 60}`,
    `Agility: ${Math.floor(Math.random() * 41) + 60}`,
    `Intelligence: ${Math.floor(Math.random() * 41) + 60}`
  ];
}

/**
 * Load existing videos.json or create empty array
 */
function loadExistingVideos() {
  try {
    if (fs.existsSync(VIDEOS_JSON_PATH)) {
      const data = fs.readFileSync(VIDEOS_JSON_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading videos.json:', error);
  }
  return [];
}

/**
 * Save videos array to videos.json
 */
function saveVideosJson(videos) {
  try {
    const jsonData = JSON.stringify(videos, null, 2);
    fs.writeFileSync(VIDEOS_JSON_PATH, jsonData, 'utf8');
    console.log(`✅ Updated videos.json with ${videos.length} videos`);
  } catch (error) {
    console.error('Error saving videos.json:', error);
  }
}

/**
 * Scan videos folder and update JSON
 */
function updateVideosJson() {
  try {
    const existingVideos = loadExistingVideos();
    const existingSources = existingVideos.map(v => v.src);
    
    // Get all video files in the videos folder
    const videoFiles = fs.readdirSync(VIDEOS_FOLDER)
      .filter(file => VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase()))
      .map(file => `videos/${file}`);
    
    console.log(`📁 Found ${videoFiles.length} video files in folder`);
    
    // Find new videos
    const newVideos = videoFiles.filter(src => !existingSources.includes(src));
    
    if (newVideos.length > 0) {
      console.log(`🆕 Found ${newVideos.length} new videos:`, newVideos);
      
      // Add new videos to the array
      newVideos.forEach(src => {
        const fileName = path.basename(src);
        const newVideo = {
          src: src,
          name: generateCharacterName(existingVideos, fileName),
          cardImage: `images/card${Math.floor(Math.random() * 10) + 1}.jpg`,
          info: generatePerformanceStats(),
          timestamp: new Date().toISOString()
        };
        
        existingVideos.unshift(newVideo); // Add to beginning for newest-first order
        console.log(`➕ Added: ${newVideo.name} (${src})`);
      });
      
      // Save updated JSON
      saveVideosJson(existingVideos);
      
      // Create a signal file that the web page can check
      fs.writeFileSync('./videos-updated.signal', new Date().toISOString());
      
    } else {
      console.log('✅ No new videos found');
    }
    
    // Remove videos that no longer exist in folder
    const currentVideos = existingVideos.filter(video => videoFiles.includes(video.src));
    if (currentVideos.length !== existingVideos.length) {
      console.log(`🗑️ Removed ${existingVideos.length - currentVideos.length} videos that no longer exist`);
      saveVideosJson(currentVideos);
      fs.writeFileSync('./videos-updated.signal', new Date().toISOString());
    }
    
  } catch (error) {
    console.error('Error updating videos JSON:', error);
  }
}

/**
 * Start file watcher
 */
function startWatcher() {
  console.log('🔍 Starting video folder watcher...');
  console.log(`📂 Watching folder: ${path.resolve(VIDEOS_FOLDER)}`);
  
  // Initial scan
  updateVideosJson();
  
  // Watch for changes
  const watcher = chokidar.watch(VIDEOS_FOLDER, {
    ignored: /^\./, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
  });
  
  watcher
    .on('add', filePath => {
      const ext = path.extname(filePath).toLowerCase();
      if (VIDEO_EXTENSIONS.includes(ext)) {
        console.log(`📥 New video detected: ${filePath}`);
        setTimeout(() => updateVideosJson(), 1000); // Delay to ensure file is fully written
      }
    })
    .on('unlink', filePath => {
      const ext = path.extname(filePath).toLowerCase();
      if (VIDEO_EXTENSIONS.includes(ext)) {
        console.log(`🗑️ Video removed: ${filePath}`);
        updateVideosJson();
      }
    })
    .on('error', error => console.error('Watcher error:', error));
  
  console.log('✅ File watcher started successfully!');
  console.log('💡 Add video files to the videos/ folder to see automatic updates');
}

// Start the watcher
if (require.main === module) {
  startWatcher();
} 