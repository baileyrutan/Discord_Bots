// Author: Bailey Dishman
// File: readInData.js
// File Created: 11/18/2019

const fs = require('fs');
const csvParse = require('csv-parse/sync'); // Use the sync version

module.exports = 
{
	readInData : function(file)
	{
		try {
			// Read file synchronously
			const fileContent = fs.readFileSync(file, 'utf8');
			
			// Parse CSV synchronously
			const records = csvParse.parse(fileContent, {
				columns: true,
				skip_empty_lines: true
			});
			
			console.log(`Successfully loaded ${records.length} responses from ${file}`);
			return records;
			
		} catch (error) {
			console.error(`Error reading CSV file ${file}:`, error);
			return [];
		}
	}
}

// References: 
// https://stackoverflow.com/questions/47035889/javascript-node-read-from-csv-file-and-store-data-into-object