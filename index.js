// Author: Bailey Dishman
// File: index.js
// File Created: 10/27/2019

const data = require('./dataRead.js');
const Discord = require('discord.js');
const GabeBot = new Discord.Client();

const response = data.readInData();

// On message received, begin executing this code
// IF previous message is NOT from Gabebot, proceed
GabeBot.on('message', (message) => 
{
	
	if(message.author.bot === false)
	{
		
		let messageContent = message.content;
		messageContent = messageContent.toLowerCase();
		
		for(let i = 0; i < response.length; i++)
		{
			
			if(messageContent.includes(response[i]['trigger']))
			{
			
				message.channel.send(response[i]['quote']);
				
			}
		
		}
		
	}
	
});

GabeBot.login('ENTERTOKENHERE');

// References: 
// https://stackoverflow.com/questions/47035889/javascript-node-read-from-csv-file-and-store-data-into-object