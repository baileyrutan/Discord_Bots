// Author: Bailey Dishman
// File: getResponses.js
// File Created: 11/27/2019

module.exports = 
{

	getResponses : function(message, responseData, responses)
	{
		
		let responseCounter = 0;
		let quote = 0;
		
		for(let i = 0; i < responseData.length; i++)
		{
		
			if(message.includes(responseData[i]['trigger']))
			{
				
				responses[responseCounter] = responseData[i]['quote'];
				responseCounter++;
				
			}
		
		}

		return responses;
		
	}

}