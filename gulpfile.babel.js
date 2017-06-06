import gulp from 'gulp';
import ConfigurationReader from './lib/configuration-reader';

const builder = {
	name: ''
}

builder.config = new ConfigurationReader({});

// import tasks
import addHosts from './tasks/hostfile';
import StylesTask from './tasks/styles';
import PublishTask from './tasks/publish';
import IISBindingTask from './tasks/iisbinding';

const styles = new StylesTask(builder.config).task();
const iisBindings = new IISBindingTask(builder.config).task();
iisBindings.displayName = 'ISS Website Creation';
const hostsBindings = addHosts.bind(builder)
const publish = new PublishTask(builder.config.scopes.Publish).task; 

gulp.task('setup', gulp.series(iisBindings, styles));

exports.build = gulp.parallel(styles);
exports.publish = publish;
exports.styles = styles;
exports.hosts = hostsBindings;

exports.default = function(done) {
	console.log('does nothing yet.');
	done();
}

gulp.on('stop', () => { process.exit(0); });
gulp.on('err', () => { process.exit(1); });