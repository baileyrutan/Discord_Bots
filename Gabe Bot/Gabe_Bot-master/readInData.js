// Author: Bailey Dishman
// File: readInData.js
// File Created: 11/18/2019

const csv = require('csv');
const fs = require('fs');

module.exports = 
{

	readInData : function(file)
	{
		
		const response = [];

		let readStream = fs.createReadStream(file);

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

// References: 
// https://stackoverflow.com/questions/47035889/javascript-node-read-from-csv-file-and-store-data-into-object