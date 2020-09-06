/*
	Gulpfile is responsible for all gulp actions in the project
	Nick Aguilos / August 5, 2020
*/

const gulp = require('gulp'); 
const mode = require('gulp-mode');
const sass = require('gulp-dart-sass');
const browserSync = require('browser-sync').create();
var webPath = 'web';

// Set Sass Paths
var sassPaths = [
	'./scss'
]

// Compile SCSS to CSS
function style() {
	// It's 3 steps

	// 1. Find my scss files. This can to be changed depending on project structure
	return gulp.src('./scss/**/*.scss')

	// 2. Pass it through sass compiler
	.pipe(sass({
		includePaths: sassPaths
	}).on('error', sass.logError)) // Prettifies the error output in terminal

	// 3. Where to save compiled scss. This can to be changed depending on project structure
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(gulp.dest('./'+webPath+'/css'))

	// 4. update all browsers reading this project via browserSync
	.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './'+webPath
			// Other options possible here are port numbers and proxies, etc.
		}
	});
	gulp.watch('./scss/**/*.scss', style);
	gulp.watch('./app/**/*.html').on('change', browserSync.reload);
	gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
}

// To make this commaned available via the cli. Older gulp versions (<v4) didnt need this
exports.style = style;
exports.watch = watch;