'use strict';
const fs = require('fs');
const readline = require('readline');

module.exports = (input, keys, opts) =>
	new Promise((resolve, reject) => {
		if (!input || !keys || typeof input !== 'string') {
			reject(new Error('All required arguments are not defined'));
		}

		opts = opts || {};
		const delimiter = opts.delimiter || ',';
		keys = keys || '';
		const objectStore = [];

		const readLineStream = readline.createInterface({
			input: fs.createReadStream(input, 'utf-8')
		});

		readLineStream
			.on('line', line => {
				const object = lineParser(line, {delimiter, keys});
				objectStore.push(object);
			})
			.on('close', () => {
				resolve(objectStore);
			});
	});

function lineParser(line, params) {
	const data = line.split(params.delimiter);
	const lineObject = {};

	data.forEach((value, index) => {
		lineObject[params.keys[index]] = value.trim();
	});

	return lineObject;
}
