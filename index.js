'use strict';
const fs = require('fs');
const assert = require('assert')
const readline = require('readline');

module.exports = (input, options) =>
	new Promise((resolve, reject) => {
		assert.ok(typeof input === 'string', "assert input is a file path string");

		if (!input) {
			reject(Error('Input not entered'));
		}

		options = options || {};
		const encoding = options.encoding || 'utf8';
		const delimiter = options.delimiter || ',';
		const objectStore = [];
		let keys = [];

		if (options.keys) {
			keys = options.keys;
		}

		const readLineStream = readline.createInterface({
			input: fs.createReadStream(input, encoding)
		});

		let firstLine = true;

		readLineStream
			.on('line', line => {
				if (firstLine && !options.keys) {
					keys = line.split(delimiter);
					firstLine = false;
					return;
				}

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

