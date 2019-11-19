// Author: Bailey Dishman
// File: index.js
// File Created: 10/27/2019

const data = require('./dataRead.js');
const randomQuote = require('./randomizeResponse.js');
const Discord = require('discord.js');
const GabeBot = new Discord.Client();

const responseData = data.readInData('responseData.csv');

// On message received, begin executing this code
// IF previous message is NOT from Gabebot, proceed
// IF previous message contains a 'trigger',
// send a message with the associated 'quote'
GabeBot.on('message', (message) => 
{
	
	if(message.author.bot === false)
	{
		
		let messageContent = message.content;
		messageContent = messageContent.toLowerCase();
		
		const quote = randomQuote.randomQuote(messageContent, responseData);

		message.channel.send(quote);

	}
	
});

GabeBot.login('ENTERTOKENHERE');

