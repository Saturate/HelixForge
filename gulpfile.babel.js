import gulp from 'gulp';
import chalk from 'chalk';


import ConfigurationReader from './lib/configuration-reader';

const cr = new ConfigurationReader();

module.exports.default = function(done) {
	console.log('does nothing yet.');
	done();
}