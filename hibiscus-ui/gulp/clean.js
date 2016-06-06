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
    return del(config.paths.cleanup);
  }
);

gulp.task(
  'clean:temp',
  'Clean temp folder',
  function() {
    return del(config.paths.temp);
  }
);

gulp.task(
  'clean:magnolia',
  'Clean dist-magnolia folder',
  function (callback) {
    runSequence('clean:magnolia:yaml', 'clean:magnolia:ftl', 'clean:magnolia:css', 'clean:magnolia:js', 'clean:temp', function () {
      callback();
    });
  }
);

gulp.task(
  'clean:magnolia:yaml',
  'Clean the yaml files on dist-magnolia folder',
  function () {
    console.log('calling clean:magnolia:yaml');
    del(config.paths.final + '/**/*.yaml');
  }
);

gulp.task(
  'clean:magnolia:ftl',
  'Clean the ftl files on dist-magnolia folder',
  function () {
    console.log('calling clean:magnolia:ftl');
    del(config.paths.final + '/**/*.ftl');
  }
);

gulp.task(
  'clean:magnolia:css',
  'Clean the css files on dist-magnolia folder',
  function () {
    console.log('calling clean:magnolia:css');
    del(config.paths.final + '/**/*.css');
  }
);

gulp.task(
  'clean:magnolia:js',
  'Clean the js files on dist-magnolia folder',
  function () {
    console.log('calling clean:magnolia:js');
    del(config.paths.final + '/**/*.js');
  }
);

gulp.task(
  'clean:styleguide',
  'Clean dist-styleguide folder',
  function() {
    return del(config.paths.distStyleguide);
  }
);

// helper to get initial task
// gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
// gulp.Gulp.prototype._runTask = function(task) {
//   this.currentTask = task;
//   this.__runTask(task);
// }
