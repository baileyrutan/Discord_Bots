const https = require('https');
const { configuration } = require('../configuration/configuration');

/**
 * Service for Discord API interactions
 */
class DiscordApiService {
    /**
     * Fetches guild information
     * @param {string} guildId - Guild ID to fetch
     * @returns {Promise<Object>} - Guild data
     */
    static fetchGuild(guildId) {
        return this._makeApiRequest(`/guilds/${guildId}`);
    }

    /**
     * Fetches scheduled events for a guild
     * @param {string} guildId - Guild ID to fetch events for
     * @returns {Promise<Array>} - Array of events
     */
    static fetchGuildScheduledEvents(guildId) {
        return this._makeApiRequest(`/guilds/${guildId}/scheduled-events`);
    }

    /**
     * Makes a request to the Discord API
     * @param {string} path - API endpoint path
     * @returns {Promise<Object>} - Response data
     * @private
     */
    static _makeApiRequest(path) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: configuration.api.baseUrl,
                path: `/api/${configuration.api.version}${path}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bot ${configuration.token}`,
                    'Content-Type': 'application/json'
                }
            };
            
            const req = https.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        try {
                            resolve(JSON.parse(data));
                        } catch (error) {
                            reject(new Error(`Failed to parse API response: ${error.message}`));
                        }
                    } else {
                        reject(new Error(`API request failed with status ${res.statusCode}: ${data}`));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(new Error(`Request error: ${error.message}`));
            });
            
            req.end();
        });
    }
}

module.exports = DiscordApiService; 