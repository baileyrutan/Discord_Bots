// Author: Bailey Dishman
// File: index.js
// File Created: 10/27/2019

const readInDataFunc = require('./readInData.js');
const getRandomResponseFunc = require('./getRandomResponse.js');
const Discord = require('discord.js');
const GabeBot = new Discord.Client();
const https = require('https');

// Check for bot token
const token = process.env.DISCORD_TOKEN;
if (!token) {
	console.error('Error: DISCORD_TOKEN environment variable is not set!');
	process.exit(1);
}

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
		
		const response = getRandomResponseFunc.getRandomResponse(messageContent, responseData);

		if(response)
		{
			message.channel.send(response);
		}
	}
});

// Add error handling
GabeBot.on('error', error => {
	console.error('Discord client error:', error);
});

// When the bot is ready, get guild information
GabeBot.on('ready', () => {
	console.log(`Logged in as ${GabeBot.user.tag}!`);
	const serverId = process.env.BOT_TEST_SERVER_ID;
	
	// Make a direct API call
	const options = {
		hostname: 'discord.com',
		path: `/api/v6/guilds/${serverId}`,
		method: 'GET',
		headers: {
			'Authorization': `Bot ${token}`,
			'Content-Type': 'application/json'
		}
	};
	
	const req = https.request(options, (res) => {
		let data = '';
		
		res.on('data', (chunk) => {
			data += chunk;
		});
		
		res.on('end', () => {
			if (res.statusCode === 200) {
				const guild = JSON.parse(data);
				console.log('Guild Information:');
				console.log(`Name: ${guild.name}`);
				console.log(`ID: ${guild.id}`);
				console.log(`Owner ID: ${guild.owner_id}`);
				console.log('guild', guild);
				console.log(`Member Count: ${guild.approximate_member_count}`);
			} else {
				console.log(`Failed to get guild: ${res.statusCode}`);
				console.log(data);
			}
		});
	});
	
	req.on('error', (error) => {
		console.error('Error making request:', error);
	});
	
	req.end();
});

GabeBot.login(token);