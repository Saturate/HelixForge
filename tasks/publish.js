import msbuild from 'gulp-msbuild';
import gulp from 'gulp';
import debug from 'debug-logger';

const log = debug('polymerase:publish');


class Publish {
    constructor (config) {
        log.trace('Init styles task with config', config);
        this.config = config;
        
        return this.task;
    }

    getLayers() {
        return this.config;
    }

    task() {
        return gulp.src('./*.sln')
            .pipe(msbuild({
                    targets: ["WebPublish"],
                    logCommand: false,
                    configuration: 'debug',
                    toolsVersion: 15.0,
                    stderr: true,
                    stdout: true,
                    properties: {
                        DeployOnBuild: "true",
                        DeployDefaultTarget: "WebPublish",
                        WebPublishMethod: "FileSystem",
                        DeleteExistingFiles: "false",
                        publishUrl: './tmp', // TODO: change to config
                        _FindDependencies: "false",
                        MSDeployUseChecksum: "true"
                    },
                })
            );
    }
}

export default Publish;