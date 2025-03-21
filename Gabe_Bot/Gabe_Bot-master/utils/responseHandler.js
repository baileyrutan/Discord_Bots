// Author: Bailey Rutan
// File: responseHandler.js
// Combined from: getRandomResponse.js and getResponses.js

/**
 * Response utility for the Gabe Bot
 * Handles finding matches and selecting a random response
 */
module.exports = {
    /**
     * Gets a random response for a message
     * @param {string} message - The message to respond to
     * @param {Array} responseData - Available responses data
     * @returns {string} - Selected response or default message if no matches
     */
    getResponse: function(message, responseData) {
        // Find all matching responses
        const matches = this.findMatches(message, responseData);
        
        // Get number of matching responses
        const numberOfResponses = matches.length;
        
        // If we have matches, select and return a random one
        if (numberOfResponses > 0) {
            // Select a random index (0 if only one match)
            const selectedIndex = numberOfResponses > 1 
                ? Math.floor(Math.random() * numberOfResponses) 
                : 0;
                
            return matches[selectedIndex];
        }
        
        // Default fallback when no response found
        return "I don't know how to respond to that.";
    },
    
    /**
     * Finds all responses that match the given message
     * @param {string} message - The message to find matches for
     * @param {Array} responseData - Available responses data
     * @returns {Array} - Matching response quotes
     */
    findMatches: function(message, responseData) {
        const matches = [];
        
        // Convert message to lowercase for case-insensitive matching
        const lowerCaseMessage = message.toLowerCase();
        
        // Find all triggers that match
        for(let i = 0; i < responseData.length; i++) {
            if(lowerCaseMessage.includes(responseData[i].trigger)) {
                matches.push(responseData[i].quote);
            }
        }
        
        return matches;
    }
}; 