import gulp from 'gulp';
import chalk from 'chalk';
import powershell from 'node-powershell';

function addIisBindings(done) {

  let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  // TODO: Get data from configuration builder once ready
  var dummyBindings = [
    {
      name: 'Default Web Site',
      hostheader: 'localhost.example.com',
      ip: '127.0.0.1',
      port: 80,
      protocol: 'http'
    },
    {
      name: 'Default Web Site',
      hostheader: 'localhost.example.com',
      ip: '127.0.0.1',
      port: 443,
      protocol: 'https',
      sslflags: 0 // 0, 1, 2 or 3
    }
  ];

  const bindings = dummyBindings.slice(0);

  let addBindingPromises = bindings.map((host) => {
    new Promise((resolve, reject) => {
      ps.addCommand('New-WebBinding -Name ' + host.name + ' -Protocol ' + host.protocol + ' -Port ' + host.port + (host.ip ? ' -IPAddress ' + host.ip : '') + ' -HostHeader ' + host.hostheader + (host.sslflags ? ' -SslFlags ' + host.sslflags : '');
      ps.invoke().then(output => {
        console.log('Successfully added:', host.hostheader);
        console.log('Output', output);
        resolve();
      }).catch(err => {
        console.log(err);
        reject();
      });
    });
  });

  Promise.all(addBindingPromises).then(values => {
    console.log('All bindings added');
    done();
  });
}

exports.bindings = addIisBindings;
