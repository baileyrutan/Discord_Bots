const https = require('https');
const { config } = require('../config/config');

/**
 * Makes requests to the Discord API
 */
class ApiService {
    /**
     * Fetches guild information from Discord API
     * @param {string} guildId - ID of the guild to fetch
     * @returns {Promise<Object>} - Guild data
     */
    static fetchGuild(guildId) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: config.api.baseUrl,
                path: `/api/${config.api.version}/guilds/${guildId}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bot ${config.token}`,
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

module.exports = ApiService; 