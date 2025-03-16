const BaseApiService = require('./base/baseApiService');

/**
 * Service for guild-related API operations
 */
class GuildService extends BaseApiService {
    /**
     * Fetches guild information
     * @param {string} guildId - ID of the guild to fetch
     * @returns {Promise<Object>} - Guild data
     */
    fetchGuild(guildId) {
        return this.makeRequest(`/guilds/${guildId}`);
    }
    
    /**
     * Fetches all scheduled events for a guild
     * @param {string} guildId - ID of the guild to fetch events for
     * @returns {Promise<Array>} - Array of scheduled events
     */
    fetchGuildScheduledEvents(guildId) {
        return this.makeRequest(`/guilds/${guildId}/scheduled-events`);
    }
}

module.exports = GuildService; 