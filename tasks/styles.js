import gulp from 'gulp';
import debug from 'debug-logger';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';

const log = debug('polymerase:styles');

class SassTask {
	constructor (config) {
		log.trace('Init styles task with config', config.scopes.Styles);
		log.debug('browsersync is ', global.browsersync ? 'active': 'not present',  global.browsersync );

		this.config = config;
		this.styleConfig = config.scopes.Styles;

		this.task.bind(this);
	}

	task () {
		console.log(this);
		return () => {
			return gulp.src(this.styleConfig.styleFiles)
			.pipe(plumber())
			.pipe(sourcemaps.init())
			.pipe(sass.sync({
				outputStyle: 'expanded',
				precision: 10,
				includePaths: ['.']
			}).on('error', sass.logError))
			.pipe(postcss([
				autoprefixer(this.styleConfig.autoprefixer),
				cssnano()
			]))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(this.config.dist + 'dist/styles'));
		}
	}
}

export default SassTask;