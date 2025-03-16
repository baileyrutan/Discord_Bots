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

		let quote = 0;
		
		if(numberOfResponses > 1)
		{
			
			quote = Math.floor(Math.random() * numberOfResponses);
			
		}
		
		if(quote)
		{
			return responses[quote];
		}
		else
		{
			return "No response found";
		}
	}

}