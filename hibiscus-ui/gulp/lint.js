var gulp = require('gulp');
// TODO add lint-tools
  // jshint = require('gulp-jshint'),
  // csslint = require('gulp-csslint'),
  // config = require('./config');

gulp.task('csslint',
//'lints custom css',
 gulp.series('sass'),
 function() {
//   gulp.src(config.paths.temp.css + '/main.css')
//   .pipe(csslint('./.csslintrc'))
//     .pipe(csslint.reporter());
});

gulp.task('jslint',
 //'lints js-files',
  function() {
  // return gulp.src(config.paths.source + '/js/**/*.js')
  //   .pipe(jshint())
  //   .pipe(jshint.reporter('default'));
});
