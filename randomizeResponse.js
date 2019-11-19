// Author: Bailey Dishman
// File: randomizeResponse.js
// File Created: 11/18/2019

module.exports = 
{

	randomQuote : function(message, responseData)
	{
		
		let triggerQuote = [];
		
		let counter = 0;
		let quote = 0;
		
		for(let i = 0; i < responseData.length; i++)
		{
		
			if(message.includes(responseData[i]['trigger']))
			{
				
				triggerQuote[counter] = responseData[i]['quote'];
				counter++;
				
			}
		
		}
		
		const triggerQuoteAmount = triggerQuote.length;
		
		if(triggerQuoteAmount > 1)
		{
			
			quote = Math.floor(Math.random() * triggerQuoteAmount);
			
		}
		
		return triggerQuote[quote];
		
	}

}