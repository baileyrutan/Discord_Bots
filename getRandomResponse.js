// Author: Bailey Dishman
// File: getRandomResponse.js
// File Created: 11/18/2019

const getResponsesFunc = require('./getResponses.js');

module.exports = 
{

	getRandomResponse : function(message, responseData)
	{
		
		let responses = [];
		
		responses = getResponsesFunc.getResponses(message, responseData, responses);
		
		let numberOfResponses = responses.length;
		
		if(numberOfResponses > 1)
		{
			
			quote = Math.floor(Math.random() * numberOfResponses);
			
		}
		
		return responses[quote];
		
	}

}