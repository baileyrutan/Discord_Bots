const getRandomResponseFunc = require('../utils/getRandomResponse');
const readInDataFunc = require('../utils/readInData');
const { config } = require('../config/config');

/**
 * Handles response logic for the bot
 */
class ResponseService {
    constructor() {
        this.responseData = null;
        this.initialized = false;
    }
    
    /**
     * Initializes the response service by loading response data
     */
    initialize() {
        if (!this.initialized) {
            this.responseData = readInDataFunc.readInData(config.paths.responseData);
            this.initialized = true;
            console.log(`Loaded ${this.responseData.length} responses`);
        }
        return this;
    }
    
    /**
     * Gets a response for a message
     * @param {string} message - The message to respond to
     * @returns {string|null} - Response or null if no match
     */
    getResponse(message) {
        if (!this.initialized) {
            this.initialize();
        }
        
        return getRandomResponseFunc.getRandomResponse(message, this.responseData);
    }
}

module.exports = new ResponseService(); 