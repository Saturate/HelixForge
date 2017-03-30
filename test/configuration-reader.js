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
			path: './test/test-configurations/basic-default/'
		});

		expect(config).to.have.property('ConfigKey');
	});

	it('loads default scope configuration', () => {
		const config = new ConfigurationReader({
			path: './test/test-configurations/basic-default/'
		});

		expect(config).to.have.property('scopes');
	});

	describe('local config', function () {
		it('overrides default configuration', () => {
			const config = new ConfigurationReader({
				path: './test/test-configurations/local-override-default/'
			});

			expect(config).to.have.property('ConfigKey', 'ConfigValueOverwritten');
		});

		it('overrides default scope configuration', () => {
			const config = new ConfigurationReader({
				path: './test/test-configurations/local-override-default/'
			});

			expect(config).to.have.property('scopes');
			expect(config.scopes.Scoped).to.have.property('ScopedKey', 'ScopedValueOverwritten');

		});

		it('overrides environment and defaul configuration', () => {
			const config = new ConfigurationReader({
				path: './test/test-configurations/local-overide-all',
				env: 'unittest'
			});

			expect(config).to.have.property('ConfigKey', 'LocalKey');
		});

		it('overrides environment and default scope configuration', () => {
			const config = new ConfigurationReader({
				path: './test/test-configurations/local-overide-all',
				env: 'unittest'
			});

			expect(config).to.have.property('scopes');
			expect(config.scopes.Scoped).to.have.property('ScopedKey', 'ScopedLocalKey');
		});
	});

	describe('environment config', function () {
		it('overrides default configuration', () => {
			const config = new ConfigurationReader({
				path: './test/test-configurations/environment-override',
				env: 'unittest'
			});

			expect(config).to.have.property('ConfigKey', 'UnitTest');
		});

		it('overrides default scope configuration', () => {
			const config = new ConfigurationReader({
				path: './test/test-configurations/environment-override',
				env: 'unittest'
			});

			expect(config).to.have.property('scopes');
			expect(config.scopes.Scoped).to.have.property('ScopedKey', 'ScopedUnitTest');
		});


		it('is the specified one and overrides default configuration', () => {
			const config = new ConfigurationReader({
				path: './test/test-configurations/environment-override-multi',
				env: 'unittest'
			});

			expect(config).to.have.property('ConfigKey', 'UnitTest');
		});
		it('is the specified scoped one and overrides default scoped configuration', () => {
			const config = new ConfigurationReader({
				path: './test/test-configurations/environment-override-multi',
				env: 'unittest'
			});

			expect(config).to.have.property('scopes');
			expect(config.scopes.Scoped).to.have.property('ScopedKey', 'ScopedUnitTest');
		});
	})
});
