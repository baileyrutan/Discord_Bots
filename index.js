// Author: Bailey Dishman
// File: index.js
// File Created: 10/27/2019

const Discord = require('discord.js');
const GabeBot = new Discord.Client(); 

// ARRAYS

// quotesArr
// Array of Gabe Newell Quotes
const quotesArr = 
[

	"The PS3 is a total disaster on so many levels, I think it's really clear that Sony lost track of what customers and what developers wanted.", 
	"I've always wanted to be a giant space crab."

];

// triggersArr
// Array of triggers for GabeBot to speak
const triggersArr = 
[

	"ps3",
	"crab"
	
];

const quotesArrLen = quotesArr.length;
const triggersArrLen = triggersArr.length;

GabeBot.on('message', (message) => 
{
	
	// IF message is not from GabeBot:
	// check if a trigger was said, 
	// if a trigger was said, say the associated quote
	if(message.author.bot === false)
	{
		
		let messageContentStr = message.content;
		messageContentStr = messageContentStr.toLowerCase();
		
		for(let i = 0; i < triggersArrLen; i++)
		{
			
			if(messageContentStr.includes(triggersArr[i]))
			{
					
				message.channel.send(quotesArr[i]);
				
			}
		
		}
		
	}
	
});

GabeBot.login('ENTERTOKENHERE');