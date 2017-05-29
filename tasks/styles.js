import gulp from 'gulp';
import debug from 'debug-logger';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';

const log = debug('polymerase:styles');

function styles(styleConfig) {
	log.trace('Init styles task with config', styleConfig);
	log.debug('browsersync is ', global.browsersync ? 'active': 'not present',  global.browsersync );

	return gulp.src(styleConfig.styleFiles)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass.sync({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.']
		}).on('error', sass.logError))
		.pipe(cssnano())
		.pipe(postcss([
			autoprefixer(styleConfig.autoprefixer),
			cssnano()
		]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(this.config.dist + 'dist/styles'));
}

module.exports = styles;
