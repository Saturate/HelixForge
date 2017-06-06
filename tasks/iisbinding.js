import powershell from 'node-powershell';
import debug from 'debug-logger';

const log = debug('polymerase:IISBindingsTask');

class IISBindingsTask {
    constructor (config) {
        log.trace('Init IISBindingsTask task with config', config);
        this.config = config;

        this.ps = new powershell({
            executionPolicy: 'Bypass',
            noProfile: true
        });

        return this;
    }

    addWebsite () {
        var host = {
            '-Name': 'Test Website',
            '-PhysicalPath': './test/path'
        };
        
        this.ps.addCommand(`New-Website -Name "Test Website" -PhysicalPath "./testPath"`);
    }

    task (done) {
        const bindings = this.config.scopes.IIS.bindings;
        
        this.ps.addCommand(`New-Website -Name "Default Ploymerase Web Site" -HostHeader "DefaultPloymeraseWebSite" -Force -PhysicalPath "c:\\test"`);

        bindings.map((host) => {
            const ip = host.ip ? ` -IPAddress ${host.ip}` : '';
            const sslFlags = host.sslflags ? `-SslFlags ${host.sslflags}` : '';
            this.ps.addCommand(`New-WebBinding -Name "${host.name}" -Protocol ${host.protocol} -Port ${host.port} ${ip} -HostHeader ${host.hostheader} ${sslFlags}`);
        });

        this.ps.addCommand('Start-Website -Name "Default Ploymerase Web Site" ')

        return (done) => {
            this.ps.invoke().then(output => {
                console.log('Successfully added:\n', output);
                done();
            }).catch(err => {
                console.log(err);
                done();
            });
        }
    }
}

export default IISBindingsTask;