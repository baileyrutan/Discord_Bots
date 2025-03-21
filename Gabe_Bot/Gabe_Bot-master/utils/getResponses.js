// Author: Bailey Rutan
// File: getResponses.js
// File Created: 11/27/2019

module.exports = {
	getResponses: function(message, responseData, responses) {
		let responseCounter = 0;
		let quote = 0;
		
		// Convert message to lowercase for case-insensitive matching
		const lowerCaseMessage = message.toLowerCase();
		
		for(let i = 0; i < responseData.length; i++) {
			// Check if the lowercase message contains the trigger
			if(lowerCaseMessage.includes(responseData[i]['trigger'])) {
				responses[responseCounter] = responseData[i]['quote'];
				responseCounter++;
			}
		}

		return responses;
	}
}; 