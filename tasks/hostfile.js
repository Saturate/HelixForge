import hostile from 'hostile';

function addHosts(done) {

	// TODO: Get data from configuration manager
	var dummyDataHosts = [
		{
			ip: '127.0.0.1',
			hostname: 'localhost.example.com'
		},
		{
			ip: '127.0.0.1',
			hostname: 'localhost2.example.com'
		},
		{
			ip: '127.0.0.1',
			hostname: 'localhost3.example.com'
		}
	];

	const hosts = dummyDataHosts.slice(0); // Clone the hosts array

	function insertCollection(callback) {
		'use strict';
		var hosts = dummyDataHosts.slice(0); // Clone the hosts array
		(function insertOne() {
			var host = hosts.splice(0, 1)[0]; // get the first record and reduce by one
			hostile.set(host.ip, host.hostname, function (err) {
			if (err) {
				console.error(err);
			} else {
				console.log('Successfully added:', host.ip, host.hostname);
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
		console.log('All hosts added.');
		done();
	});
}

module.exports = addHosts;