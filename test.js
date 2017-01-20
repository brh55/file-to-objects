import path from 'path';
import test from 'ava';
import fileLineParse from './index.js';

test('Test object creation', async t => {
	const input = path.join(__dirname, 'fixture', 'fixture.csv');
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

	const firstObject = {
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

	const objectStore = await fileLineParse(input, keys);
	t.is(objectStore.length, 500, 'Store is equal to number of lines in input');
	t.deepEqual(objectStore[1], firstObject, 'Object is parsed correctly');
});

test('Test reject', async t => {
	const error = await t.throws(fileLineParse());
	t.is(error.message, 'All required arguments are not defined');
});
