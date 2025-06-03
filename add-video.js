#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper script to add new video entries to the top of data.json
function addVideoToTop(videoData) {
    const dataFile = 'data.json';
    
    try {
        // Read existing data
        const existingData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        
        // Add current timestamp if not provided
        if (!videoData.timestamp) {
            videoData.timestamp = new Date().toISOString();
        }
        
        // Add new entry to the TOP of the array
        const updatedData = [videoData, ...existingData];
        
        // Write back to file with pretty formatting
        fs.writeFileSync(dataFile, JSON.stringify(updatedData, null, 2));
        
        console.log(`✅ Added "${videoData.name}" to the top of data.json`);
        console.log(`📅 Timestamp: ${videoData.timestamp}`);
        console.log(`🔄 Refresh your browser to see the new video at the top!`);
        
        return true;
    } catch (error) {
        console.error('❌ Error adding video:', error.message);
        return false;
    }
}

// Example usage - you can modify this or call the function directly
if (require.main === module) {
    // Example: Add a new video entry
    const newVideo = {
        "movie": "https://example.com/new-video.mp4",
        "local_movie": "/Users/Richard/Desktop/webhook-summit/Xchange/JSON/LINKS/NewVideo_20250603-140000.mp4",
        "name": "New Character",
        "image": "https://example.com/new-image.jpg",
        "local_image": "/Users/Richard/Desktop/webhook-summit/Xchange/JSON/LINKS/NewVideo_20250603-140000.png",
        "info": {
            "performance": "95",
            "style": "88",
            "Fun": "92",
            "technique": "89"
        }
    };
    
    console.log('📋 Example usage:');
    console.log('To add a video, modify the newVideo object above and run: node add-video.js');
    console.log('Or use the addVideoToTop() function in your own scripts');
}

module.exports = { addVideoToTop }; 