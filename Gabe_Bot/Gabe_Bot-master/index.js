// Author: Bailey Rutan
// File: index.js
// File Created: 10/27/2019

// Main application entry point
const GabeBotClient = require('./bot');

// Create and start bot
const bot = new GabeBotClient();
bot.start();