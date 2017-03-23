import gulp from 'gulp';
import chalk from 'chalk';

// import tasks
import addHosts from './tasks/hostfile';


function cleanSetup () {
	// remove hostfile entries and ISS configuration
}

exports.hosts = addHosts;
