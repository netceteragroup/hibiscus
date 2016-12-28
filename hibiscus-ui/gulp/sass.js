var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  parker = require('gulp-parker'),
  path = require('path');


  var config = require('../patternlab-config.json');
  function paths() {
    return config.paths;
  }

gulp.task('parker', function() {
	return gulp.src(path.resolve(paths().styleguide.css + 'main.css'))
		.pipe(parker());
  });

  gulp.task('sass', function() {
      return gulp.src('main.scss', {cwd: path.resolve(paths().source.css)})
          .pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(autoprefixer({
              browsers: ['last 3 versions'],
              cascade: false,
              remove: false}))
          .pipe(sourcemaps.write()) //  .pipe(sourcemaps.write('./maps')) to write source maps to seperate files
          .pipe(gulp.dest(path.resolve(paths().temp.css)));
  });