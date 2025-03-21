// Author: Bailey Rutan
// File: getRandomResponse.js
// File Created: 11/18/2019

const getResponsesFunc = require('./getResponses.js');

module.exports = {
	getRandomResponse: function(message, responseData) {
		// Initialize responses array first
		let responses = [];
		
		// Then use it as a parameter
		responses = getResponsesFunc.getResponses(message, responseData, responses);
		
		let numberOfResponses = responses.length;
		
		// Initialize quote with default value
		let quote = 0;
		
		if(numberOfResponses > 1) {
			quote = Math.floor(Math.random() * numberOfResponses);
		}
		
		if(quote >= 0 && numberOfResponses > 0) {
			return responses[quote];
		}
	}
}; 