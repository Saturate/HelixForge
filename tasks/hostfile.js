import hostile from 'hostile';
import logger from './logger.js';

function addHosts(done) {
	//console.log('debug', 'configuration is:', this.hosts);
	logger.log('debug', 'configuration is:'+ JSON.stringify(this.hosts, null, '\t'), 'debug');

	let hostsArray = this.hosts;

	function insertCollection(callback) {
		'use strict';
		let hosts = hostsArray.slice(0); // Clone the hosts array
		(function insertOne() {
			let host = hosts.splice(0, 1)[0]; // get the first record and reduce by one
			hostile.set(host.ip, host.hostname, (err) => {
			if (err) {
				//console.error(err);
				logger.log('error', err, 'error');
			} else {
				//console.log('info', 'Successfully added', host.ip, host.hostname);
				logger.log('info', `Successfully added ${host.hostname}\t--> ${host.ip}`, 'info');
				if (hosts.length === 0) {
					callback();
				} else {
					insertOne();
				}
			}
			});
		})();
	}

	insertCollection(function() {
		//console.log('All hosts added.');
		logger.log('info', `All hosts added.`, 'info');
		done();
	});
}

module.exports = addHosts;