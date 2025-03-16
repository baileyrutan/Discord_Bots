const { config } = require('../config/config');
const GuildService = require('./guildService');
const ResponseService = require('./responseService');

/**
 * Factory for creating service instances
 */
class ServiceFactory {
    /**
     * Creates all services used by the bot
     * @returns {Object} - Object containing service instances
     */
    static createServices() {
        return {
            guildService: new GuildService(config),
            responseService: new ResponseService(config)
        };
    }
}

module.exports = ServiceFactory; 