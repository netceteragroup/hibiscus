var gulp = require('gulp-help')(require('gulp')),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  runSequence = require('run-sequence')
  config = require('./config'),
  parker = require('gulp-parker');
gulp.task('sass', function(callback) {
  runSequence('sass:transpile', 'autoprefixer', 'csslint', callback); // sass:external is called during setup to improve performance
});

gulp.task('sass:transpile', 'transpiles scss to css', function() {
  return gulp.src(config.paths.source + '/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function(path) {
      path.basename = 'main-unprefixed';
    }))
    .pipe(gulp.dest(config.paths.temp + '/webresources/css/'))
});

gulp.task('autoprefixer', function() {
  var autoprefixer = require('gulp-autoprefixer');
  return gulp.src(config.paths.temp + '/webresources/css/main-unprefixed.css')
    .pipe(rename(function(path) {
      path.basename = 'main';
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(config.paths.temp + '/webresources/css'));
});

gulp.task('parker', 'show css-stats', function() {
	return gulp.src('./dist-styleguide/webresources/css/main.css')
		.pipe(parker());
  });
