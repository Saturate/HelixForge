/*global describe, it*/
'use strict';

import 'babel-polyfill';
import ConfigurationReader from '../lib/configuration-reader';
const expect = require('chai').expect;

describe('Configuration Reader', function () {

	it('can create a configuration reader from the constructor', () => {
		//new ConfigurationReader();
	});

	it('loads default configuration', () => {
		const config = new ConfigurationReader({
			path: './test/test-configurations/1/'
		});

		expect(config).to.have.property('ConfigKey');
	});

	it('loads default scope configuration', () => {
		const config = new ConfigurationReader({
			path: './test/test-configurations/1/'
		});

		expect(config).to.have.property('scopes');
	});

	it('local config overrides default configuration', () => {
		const config = new ConfigurationReader({
			path: './test/test-configurations/2/'
		});

		expect(config).to.have.property('ConfigKey', 'ConfigValueOverwritten');
	});

	it('local config overrides default scope configuration', () => {
		const config = new ConfigurationReader({
			path: './test/test-configurations/2/'
		});

		expect(config).to.have.property('scopes');
		expect(config.scopes.Scoped).to.have.property('ScopedKey', 'ScopedValueOverwritten');

	});
});
