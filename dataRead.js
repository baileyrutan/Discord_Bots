const csv = require('csv');
const fs = require('fs');

module.exports = 
{

	readInData : function()
	{
		
		const response = [];

		let readStream = fs.createReadStream('responseData.csv');

		let parser = csv.parse({columns:true});

		parser.on('readable', function()
		{
				
			while(record = parser.read())
			{

				response.push(record);
				
			}

		});

		parser.on('error', function(err) 
		{
			
			console.log(err.message);
			
		});
		
		readStream.pipe(parser);
		
		return response;
		
	}

}