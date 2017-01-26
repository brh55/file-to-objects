import path from 'path';
import test from 'ava';
import fileToObjects from './index.js';

test('Test object creation', async t => {
	const input = path.join(__dirname, 'fixture', 'bmp.csv');
	const keys = [
		'action',
		'sequence',
		'name',
		'hash',
		'ipAddress',
		'description',
		'termCode',
		'termReason',
		'initData',
		'timestamp',
		'bgpId'
	];

	const secondObject = {
		action: 'init',
		sequence: '73bc17f6-ad2c-4950-b88c-6c2998c8edd1',
		name: 'LEAF-72000-72002',
		hash: '52fc190f1a94ef1a32f7c368d563da13',
		ipAddress: '12.1.1.2',
		description: 'Copyright (c) 2016 Mock BMP Data Generator',
		termCode: '',
		termReason: '',
		initData: '',
		timestamp: '',
		bgpId: '12.1.1.2'
	};

	const objectStore = await fileToObjects(input, { keys });

	t.is(objectStore.length, 500, 'Store is equal to number of lines in input');
	t.deepEqual(objectStore[1], secondObject, 'Object is parsed correctly');
});

test('Test reject', async t => {
	const error = await t.throws(fileToObjects());

	t.is(error.message, 'assert input is a file path string');
});

test('Test header dervied keys', async t => {
	const input = path.join(__dirname, 'fixture', 'cats.csv');
	const objectStore = await fileToObjects(input);

	t.is(objectStore.length, 4,'Length is one less than file lines because of header');
	t.deepEqual(objectStore[0], { age: '20', name: 'gerald', breed: 'ragdoll' }, 'Parsed correctly');
	t.deepEqual(objectStore[3], { age: '21', name: 'mew', breed: 'ocicat' }, 'Parsed correctly');
});
