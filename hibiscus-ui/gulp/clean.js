var gulp = require('gulp'),
del = require('del'),
runSequence = require('run-sequence'),
path = require('path');


var config = require('../patternlab-config.json');
function paths() {
  return config.paths;
}

gulp.task('clean:common',
// 'clean corresponding folders',
function() {
// decides which tasks is calling and cleans accordingly
//console.log(this)
//console.log(this.process.argv)
var callStack = this.process.argv
  if (callStack.indexOf('combined') > -1 && callStack.indexOf('dist') == -1 && callStack.indexOf('styleguide') == -1) {
     //console.log('calling clean:all');
     del(path.resolve(paths().public.root));
     del(path.resolve(paths().magnolia.root));
      return del(path.resolve(paths().temp.root));

  } else if (callStack.indexOf('dist') > -1 && callStack.indexOf('combined') == -1 || callStack.indexOf('magnolia') > -1) {
     //console.log('calling clean:magnolia');
     return del(path.resolve(paths().magnolia.root));
  } else if ((callStack.indexOf('styleguide') > -1 && callStack.indexOf('combined') == -1) || callStack.indexOf('serve') > -1) {
     //console.log('calling clean:styleguide');
     del(path.resolve(paths().temp.root));
    return del(path.resolve(paths().public.root));
  } else {
     //console.log('no clean, since upstream task already called clean:common');
  }
});
/*
gulp.task(
  'clean:all',
  //'Removed all temporary and output directories',
  function() {
    return del(config.paths.cleanup);
  }
);
*/
gulp.task(
  'clean:temp',
  //'Clean temp folder',
  function() {
    return del(path.resolve(paths().temp.root));
  }
);
/*
gulp.task(
  'clean:magnolia',
//  'Clean dist-magnolia folder',
  function (callback) {
    runSequence('clean:magnolia:yaml', 'clean:magnolia:ftl', 'clean:magnolia:css', 'clean:magnolia:js', 'clean:temp', function () {
      callback();
    });
  }
);
*/
gulp.task(
  'clean:magnolia:yaml',
  //'Clean the yaml files on dist-magnolia folder',
  function () {
    console.log('calling clean:magnolia:yaml');
    return del(path.resolve(paths().magnolia.root + '/**/*.yaml'));
  }
);

gulp.task(
  'clean:magnolia:ftl',
  //'Clean the ftl files on dist-magnolia folder',
  function () {
    console.log('calling clean:magnolia:ftl');
    return del(path.resolve(paths().magnolia.root + '/**/*.ftl'));
  }
);

gulp.task(
  'clean:magnolia:css',
//  'Clean the css files on dist-magnolia folder',
  function () {
    console.log('calling clean:magnolia:css');
    return del(path.resolve(paths().magnolia.root + '/**/*.css'));
  }
);

gulp.task(
  'clean:magnolia:js',
  //'Clean the js files on dist-magnolia folder',
  function () {
    console.log('calling clean:magnolia:js');
    return del(path.resolve(paths().magnolia.root + '/**/*.js'));
  }
);
/*
gulp.task(
  'clean:styleguide',
//  'Clean dist-styleguide folder',
  function() {
    return del(path.resolve(paths().public.root));
  }
);*/

// helper to get initial task
// gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
// gulp.Gulp.prototype._runTask = function(task) {
//   this.currentTask = task;
//   this.__runTask(task);
// }
