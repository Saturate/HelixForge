module.exports = {
    bindings: [{
        name: 'Default Ploymerase Web Site',
        hostheader: 'localhost.example.com',
        ip: '127.0.0.1',
        port: 80,
        protocol: 'http'
    },
    {
        name: 'Default Ploymerase Web Site',
        hostheader: 'localhost.example.com',
        ip: '127.0.0.1',
        port: 443,
        protocol: 'https',
        sslflags: 0 // 0, 1, 2 or 3
    }]
};