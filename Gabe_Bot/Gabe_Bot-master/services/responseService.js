const responseHandler = require('../utils/responseHandler');
const readInDataFunc = require('../utils/readInData');
const { configuration } = require('../configuration/configuration');

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
            this.responseData = readInDataFunc.readInData(configuration.paths.responseData);
            this.initialized = true;
            
            // Handle potential undefined response data
            const responseCount = this.responseData ? this.responseData.length : 0;
            console.log(`Loaded ${responseCount} responses`);
        }
        return this;
    }
    
    /**
     * Gets a response for a message
     * @param {string} message - The message to respond to
     * @returns {string} - Response message
     */
    getResponse(message) {
        if (!this.initialized) {
            this.initialize();
        }
        
        // Ensure responseData is always an array
        const data = this.responseData || [];
        return responseHandler.getResponse(message, data);
    }
}

module.exports = new ResponseService(); 