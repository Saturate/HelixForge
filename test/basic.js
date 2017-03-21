/*global describe, it*/
'use strict';

import 'babel-polyfill';

describe('Smoke Test', function () {
	it('Gulp can be required without throwing', () => {
		// not testing the actual run of generators yet
		require('../gulpfile.babel');
	});
});
