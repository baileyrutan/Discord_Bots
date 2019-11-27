// Author: Bailey Dishman
// File: index.js
// File Created: 10/27/2019

const readInDataFunc = require('./readInData.js');
const getRandomResponseFunc = require('./getRandomResponse.js');
const Discord = require('discord.js');
const GabeBot = new Discord.Client();

const responseData = readInDataFunc.readInData('responseData.csv');

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
		
		const response = getRandomResponseFunc.getRandomResponse(messageContent, responseData);

		message.channel.send(response);

	}
	
});

GabeBot.login('ENTERTOKENHERE');