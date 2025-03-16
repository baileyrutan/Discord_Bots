// Centralized configuration management
const config = {
    // Bot configuration
    token: process.env.DISCORD_TOKEN,
    serverId: process.env.BOT_TEST_SERVER_ID,
    
    // API endpoints
    api: {
        baseUrl: 'discord.com',
        version: 'v9'
    },
    
    // File paths
    paths: {
        responseData: 'responseData.csv'
    }
};

// Validate required configuration
function validateConfig() {
    if (!config.token) {
        throw new Error('DISCORD_TOKEN environment variable is not set!');
    }
}

module.exports = {
    config,
    validateConfig
}; 