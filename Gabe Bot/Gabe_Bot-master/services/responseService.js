const getRandomResponseFunc = require('../utils/getRandomResponse');
const readInDataFunc = require('../utils/readInData');

/**
 * Handles response logic for the bot
 */
class ResponseService {
    /**
     * Creates a new response service
     * @param {Object} config - Configuration object
     */
    constructor(config) {
        this.config = config;
        this.responseData = null;
        this.initialized = false;
    }
    
    /**
     * Initializes the response service by loading response data
     */
    initialize() {
        if (!this.initialized) {
            this.responseData = this.loadResponseData();
            this.initialized = true;
            console.log(`Loaded ${this.responseData.length} responses`);
        }
        return this;
    }
    
    /**
     * Loads response data from file
     * @returns {Array} - Response data
     */
    loadResponseData() {
        return readInDataFunc.readInData(this.config.paths.responseData);
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

module.exports = ResponseService; 