var gulp = require('gulp-help')(require('gulp')),
del = require('del'),
runSequence = require('run-sequence'),
config = require('./config');

gulp.task('clean:common', 'clean corresponding folders', function(callback) {
// decides which tasks is calling and cleans accordingly
var callStack = this.seq;
  if (callStack.indexOf('combined') > -1 && callStack.indexOf('dist') == -1 && callStack.indexOf('styleguide') == -1) {
    // console.log('calling clean:all');
    return runSequence('clean:all', function() {
        callback();
      });
  } else if (callStack.indexOf('dist') > -1 && callStack.indexOf('combined') == -1) {
    // console.log('calling clean:magnolia');
    return runSequence('clean:magnolia', function() {
        callback();
      });
  } else if ((callStack.indexOf('styleguide') > -1 && callStack.indexOf('combined') == -1) || callStack.indexOf('serve') > -1) {
    // console.log('calling clean:styleguide');
    return runSequence('clean:styleguide', function() {
        callback();
      });
  } else {
    // console.log('no clean, since upstream task already called clean:common');
    callback();
  }
});

gulp.task(
  'clean:all',
  'Removed all temporary and output directories',
  function() {
    return del(config.paths.cleanup, {read: false});
  }
);

gulp.task(
  'clean:temp',
  'Clean temp folder',
  function() {
    return del(config.paths.temp, {read: false});
  }
);

gulp.task(
  'clean:magnolia',
  'Clean dist-magnolia folder',
  function() {
    return del(config.paths.distMagnolia, {read: false});
  }
);

gulp.task(
  'clean:styleguide',
  'Clean dist-styleguide folder',
  function() {
    return del(config.paths.distStyleguide, {read: false});
  }
);

// helper to get initial task
// gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
// gulp.Gulp.prototype._runTask = function(task) {
//   this.currentTask = task;
//   this.__runTask(task);
// }
