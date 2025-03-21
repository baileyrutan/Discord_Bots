/**
 * Configuration settings for the application
 */
const configuration = {
    // Bot configuration
    token: process.env.DISCORD_TOKEN || 'test-token',
    serverId: process.env.BOT_TEST_SERVER_ID || '123456789',
    
    // API endpoints
    api: {
        baseUrl: 'discord.com',
        version: 'v9'
    },
    
    // File paths
    paths: {
        responseData: './data/responseData.csv'
    }
};

/**
 * Validates the configuration
 * @throws {Error} If configuration is invalid
 */
function validateConfig() {
    if (!configuration.token) {
        throw new Error('DISCORD_TOKEN environment variable is not set!');
    }
}

module.exports = {
    configuration,
    validateConfig
}; 