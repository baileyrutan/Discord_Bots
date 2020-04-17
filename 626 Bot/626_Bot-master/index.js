// Author: Bailey Dishman
// File: index.js
// File Created: 9/8/2018

const Discord = require("discord.js");
const Botboi = new Discord.Client(); 

const commando = require('discord.js-commando');

const BotComm = new commando.Client();

Botboi.on('message', (message) => 
{
	
	let messageContentStr = message.content;
	messageContentStr = messageContentStr.toLowerCase();
	
	// Scold
	
	let scoldBool = false; 
	scoldBool = messageContentStr.includes("scold");
	
	// Arrays
	// scoldArr : Array of scolding strings to write to the user that is being scolded
	// nameArr : Array of names that can be referenced within the discord channel 
	
	const scoldArr = ["bad", "stop it"];
	const nameArr = ["phil", "shea", "grant", "alex", "bailey", "scott", "brandon", "chris", "626"];

	let scoldArrLen = scoldArr.length;
	let nameArrLen = nameArr.length;

	// Runs if "scold" is in the message
	
	if(scoldBool == true)
	{
		
		for(let i = 0; i < nameArrLen; i++)
		{

			if(messageContentStr.includes(nameArr[i]))
			{
				
				let currentName = nameArr[i];
				let scoldIndex = Math.floor(Math.random() * scoldArrLen);			
				
				message.channel.send(scoldArr[scoldIndex] + " " + currentName);
				scoldBool = false;
			
			}

		}
		
		if(scoldBool == true)
		{
			
			message.channel.send("Who are you talking about?");
			scoldBool = false;
			
		}
	
	}
	
});

BotComm.registry.registerGroup('random','Random');
BotComm.registry.registerDefaults();
BotComm.registry.registerCommandsIn(__dirname + "/commands");

Botboi.login('ENTERTOKENHERE');
BotComm.login('ENTERTOKENHERE');