/*import gulp from 'gulp';
import chalk from 'chalk';
*/
import ConfigurationReader from './lib/configuration-reader';

const builder = {
	name: ''
}

builder.config = new ConfigurationReader({});

// import tasks
import addHosts from './tasks/hostfile';
import styles from './tasks/styles';

exports.styles = styles.bind(builder, builder.config.scopes.Styles);

exports.default = function(done) {
	console.log('does nothing yet.');
	done();
}

exports.hosts = addHosts.bind(builder);
