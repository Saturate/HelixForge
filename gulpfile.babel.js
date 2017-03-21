import gulp from 'gulp';
import chalk from 'chalk';
import hostile from 'hostile';

function addHosts(done) {

	// TODO: Get data from configuration manager
	var dummyDataHosts = [
		{
			ip: '127.0.0.1',
			hostname: 'localhost.example.com'
		}
	];

	const hosts = dummyDataHosts.slice(0); // Clone the hosts array
	let addHostPromises = hosts.map(host => {
		new Promise((resolve, reject) => {
			hostile.set(host.ip, host.hostname, function (err) {
				if (err) {
					reject();
					console.error(err);
				} else {
					console.log('Successfully added:', host.ip, host.hostname);
					resolve();
				}
			});
		});
	});

	Promise.all(addHostPromises).then(values => {
		console.log('All hosts added.');
		done()
	});
}

exports.hosts = addHosts;
