/**
 * Base class for API services
 */
const https = require('https');

class BaseApiService {
    /**
     * Creates a new API service
     * @param {Object} config - Configuration object
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * Makes an HTTP request to the Discord API
     * @param {string} path - API endpoint path
     * @param {string} method - HTTP method
     * @returns {Promise<Object>} - Response data
     */
    makeRequest(path, method = 'GET') {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: this.config.api.baseUrl,
                path: `/api/${this.config.api.version}${path}`,
                method: method,
                headers: {
                    'Authorization': `Bot ${this.config.token}`,
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

module.exports = BaseApiService; 