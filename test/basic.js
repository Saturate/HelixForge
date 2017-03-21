/*global describe, it*/
'use strict';

describe('Smoke Test', function () {
	it('Gulp can be required without throwing', () => {
		// not testing the actual run of generators yet
		require('../gulpfile');
	});
});
