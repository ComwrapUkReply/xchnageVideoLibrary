const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const VIDEOS_FOLDER = './videos';
const LIBRARY_JSON_PATH = './viedo-library.json';

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
  'Wind Spirit', 'Earth Guardian', 'Water Nymph', 'Air Elemental',
  'Nova Champion', 'Quantum Phantom', 'Stellar Warrior', 'Cosmic Ranger',
  'Digital Assassin', 'Cyber Guardian', 'Neon Striker', 'Plasma Knight',
  'Void Walker', 'Shadow Hunter', 'Light Bringer', 'Dark Rider',
  'Storm Lord', 'Fire Master', 'Ice Prince', 'Wind Sage'
];

// Card image pool for random assignment
const CARD_IMAGES = [
  'images/card1.jpg', 'images/card2.jpg', 'images/card3.jpg', 'images/card4.jpg',
  'images/card5.jpg', 'images/card6.jpg', 'images/card7.jpg', 'images/card8.jpg',
  'https://cdn.imagineapi.dev/assets/56c185f9-f718-4581-9c18-949611b65d19/0cf34b5d-6386-42ea-8bba-53a9cf6e4b0d.png',
  'https://cdn.imagineapi.dev/assets/e89c271d-6b9b-4aa8-9502-5bed07b652f0/aa34c4cd-35a1-4fcf-b2c6-f750c9241170.png',
  'https://cdn.imagineapi.dev/assets/fcff6d0c-f0a9-47f1-9948-81f6d05b5978/c9c70416-825a-479d-9237-0235af76db89.png',
  'https://cdn.imagineapi.dev/assets/8fb56d9c-54c1-4cd6-a0c3-a987da434351/eececde7-6984-482c-a2bf-abebc95fe0a7.png'
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
 * Generate random performance stats for the new simplified format
 */
function generatePerformanceStats() {
  return {
    performance: (Math.floor(Math.random() * 41) + 60).toString(), // 60-100
    style: (Math.floor(Math.random() * 41) + 60).toString(),       // 60-100
    Fun: (Math.floor(Math.random() * 41) + 60).toString(),         // 60-100
    technique: (Math.floor(Math.random() * 41) + 60).toString()    // 60-100
  };
}

/**
 * Load existing viedo-library.json or create empty array
 */
function loadExistingVideos() {
  try {
    if (fs.existsSync(LIBRARY_JSON_PATH)) {
      const data = fs.readFileSync(LIBRARY_JSON_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading viedo-library.json:', error);
  }
  return [];
}

/**
 * Save videos array to viedo-library.json
 */
function saveLibraryJson(videos) {
  try {
    const jsonData = JSON.stringify(videos, null, 2);
    fs.writeFileSync(LIBRARY_JSON_PATH, jsonData, 'utf8');
    console.log(`✅ Updated viedo-library.json with ${videos.length} videos`);
  } catch (error) {
    console.error('Error saving viedo-library.json:', error);
  }
}

/**
 * Scan videos folder and update viedo-library.json
 */
function updateLibraryJson() {
  try {
    const existingVideos = loadExistingVideos();
    const existingMovies = existingVideos.map(v => v.movie);
    
    // Get all video files in the videos folder
    const videoFiles = fs.readdirSync(VIDEOS_FOLDER)
      .filter(file => VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase()))
      .map(file => `videos/${file}`);
    
    console.log(`📁 Found ${videoFiles.length} video files in folder`);
    
    // Find new videos
    const newVideos = videoFiles.filter(movie => !existingMovies.includes(movie));
    
    if (newVideos.length > 0) {
      console.log(`🆕 Found ${newVideos.length} new videos:`, newVideos);
      
      // Add new videos to the array
      newVideos.forEach(movie => {
        const fileName = path.basename(movie);
        const stats = generatePerformanceStats();
        const randomImage = CARD_IMAGES[Math.floor(Math.random() * CARD_IMAGES.length)];
        
        const newVideo = {
          name: generateCharacterName(existingVideos, fileName),
          image: randomImage,
          movie: movie,
          theme: "XChange",
          date: Math.floor(Date.now() / 1000).toString(), // Unix timestamp
          event: "XChange",
          email: "contact@xchange.com",
          performance: stats.performance,
          style: stats.style,
          Fun: stats.Fun,
          technique: stats.technique
        };
        
        existingVideos.unshift(newVideo); // Add to beginning for newest-first order
        console.log(`➕ Added: ${newVideo.name} (${movie}) - Performance: ${stats.performance}, Style: ${stats.style}, Fun: ${stats.Fun}, Technique: ${stats.technique}`);
      });
      
      // Save updated JSON
      saveLibraryJson(existingVideos);
      
      // Create a signal file that the web page can check
      fs.writeFileSync('./videos-updated.signal', new Date().toISOString());
      
    } else {
      console.log('✅ No new videos found');
    }
    
    // Remove videos that no longer exist in folder
    const currentVideos = existingVideos.filter(video => videoFiles.includes(video.movie));
    if (currentVideos.length !== existingVideos.length) {
      console.log(`🗑️ Removed ${existingVideos.length - currentVideos.length} videos that no longer exist`);
      saveLibraryJson(currentVideos);
      fs.writeFileSync('./videos-updated.signal', new Date().toISOString());
    }
    
  } catch (error) {
    console.error('Error updating library JSON:', error);
  }
}

/**
 * Start file watcher
 */
function startWatcher() {
  console.log('🔍 Starting video library watcher...');
  console.log(`📂 Watching folder: ${path.resolve(VIDEOS_FOLDER)}`);
  console.log(`📄 Updating file: ${path.resolve(LIBRARY_JSON_PATH)}`);
  
  // Initial scan
  updateLibraryJson();
  
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
        setTimeout(() => updateLibraryJson(), 1000); // Delay to ensure file is fully written
      }
    })
    .on('unlink', filePath => {
      const ext = path.extname(filePath).toLowerCase();
      if (VIDEO_EXTENSIONS.includes(ext)) {
        console.log(`🗑️ Video removed: ${filePath}`);
        updateLibraryJson();
      }
    })
    .on('error', error => console.error('Watcher error:', error));
  
  console.log('✅ Video library watcher started successfully!');
  console.log('💡 Add video files to the videos/ folder to see automatic updates in viedo-library.json');
  console.log('🌐 VideoViewer.html will automatically refresh when changes are detected');
}

// Start the watcher
if (require.main === module) {
  startWatcher();
} 