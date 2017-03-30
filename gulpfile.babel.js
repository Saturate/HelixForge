/*import gulp from 'gulp';
import chalk from 'chalk';

import ConfigurationReader from './lib/configuration-reader';


const cr = new ConfigurationReader({

});
*/

// import tasks
import addHosts from './tasks/hostfile';

module.exports.default = function(done) {
	console.log('does nothing yet.');
	done();
}

exports.hosts = addHosts;

