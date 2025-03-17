// Centralized configuration management
const configuration = {
    // Bot configuration
    token: process.env.DISCORD_TOKEN,
    serverId: process.env.BASEMENT_SERVER_ID,
    
    // API endpoints
    api: {
        baseUrl: 'discord.com',
        version: 'v9'
    },
    
    // File paths
    paths: {
        responseData: 'chat_trigger_response_data.csv'
    }
};

// Validate required configuration
function validateConfig() {
    if (!configuration.token) {
        throw new Error('DISCORD_TOKEN environment variable is not set!');
    }
}

module.exports = {
    configuration,
    validateConfig
}; 