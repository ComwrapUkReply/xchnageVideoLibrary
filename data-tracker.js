const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

console.log('🔍 Data Tracker starting...');

const DATA_FILE = 'data.json';
const SIGNAL_FILE = 'data-updated.signal';

// Create initial signal file if it doesn't exist
function createSignalFile() {
  const timestamp = new Date().toISOString();
  fs.writeFileSync(SIGNAL_FILE, timestamp);
  console.log(`📝 Created signal file: ${SIGNAL_FILE} with timestamp: ${timestamp}`);
}

// Update signal file when data.json changes
function updateSignalFile() {
  const timestamp = new Date().toISOString();
  fs.writeFileSync(SIGNAL_FILE, timestamp);
  console.log(`🔄 Updated signal file: ${SIGNAL_FILE} with timestamp: ${timestamp}`);
}

// Check if data.json exists
if (!fs.existsSync(DATA_FILE)) {
  console.log(`⚠️  ${DATA_FILE} not found. Waiting for it to be created...`);
} else {
  console.log(`✅ Found ${DATA_FILE}, creating initial signal file...`);
  createSignalFile();
}

// Watch for changes to data.json
const watcher = chokidar.watch(DATA_FILE, {
  ignored: /^\./, // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});

watcher
  .on('add', path => {
    console.log(`📁 ${DATA_FILE} has been added`);
    createSignalFile();
  })
  .on('change', path => {
    console.log(`📝 ${DATA_FILE} has been changed`);
    updateSignalFile();
  })
  .on('unlink', path => {
    console.log(`🗑️  ${DATA_FILE} has been removed`);
  })
  .on('error', error => {
    console.error('❌ Error watching file:', error);
  });

console.log(`👁️  Watching ${DATA_FILE} for changes...`);
console.log('📡 Data tracker is running. Press Ctrl+C to stop.');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping data tracker...');
  watcher.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping data tracker...');
  watcher.close();
  process.exit(0);
}); 