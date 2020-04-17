const commando = require('discord.js-commando');

// FlipACoin Class

class FlipACoin extends commando.Command 
{

	constructor(client)
	{
		
		// Constructor 
	
		super(client, 
		{
			
			// Properties of FlipACoin command
			
			name: 'flip',
			group: 'random',
			memberName: 'flip',
			description: 'Flips a coin'
		
		});
	
	} // End constructor 
	
	async run(message, args)
	{
		
		// Generate a number either 0 or 1
		// 0 = Heads
		// 1 = Tails 
		
		var flip = Math.floor(Math.random() * 2);
		
		if(flip == 0)
		{
		
			message.reply("Heads");
		
		}
		else if(flip == 1)
		{
		
			message.reply("Tails");
		
		}
	
	}

}

// End of FlipACoin Class

module.exports = FlipACoin;