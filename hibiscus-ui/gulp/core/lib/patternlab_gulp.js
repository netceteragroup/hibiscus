/*
 * patternlab-node - v1.2.0 - 2016
 *
 * Brian Muenzenmeyer, and the web community.
 * Licensed under the MIT license.
 *
 * Many thanks to Brad Frost and Dave Olsen for inspiration, encouragement, and advice.
 *
 */

var patternlab_engine = require('./patternlab.js');
/* #CHANGED added gulp-util and node-notifier */
var gutil = require('gulp-util');
var notifier = require('node-notifier');

module.exports = function (gulp) {
/* #CHANGED added error handling (used for mustache-syntax errors), disabled clean task */
  gulp.task('patternlab'/*, ['clean']*/, function (cb) {
    var patternlab = patternlab_engine();
    try {
      patternlab.build(false);
    } catch(err) {
      gutil.log(gutil.colors.red(err.message));
      notifier.notify('There were errors while rendering your patterns. Please check your sources...');
    }
    cb();
  });

  gulp.task('patternlab:version', function () {
    var patternlab = patternlab_engine();
    patternlab.version();
  });
  /* #CHANGED disabled clean task */
  gulp.task('patternlab:only_patterns'/*, ['clean']*/, function () {
    var patternlab = patternlab_engine();
    patternlab.build_patterns_only(false);
  });

  gulp.task('patternlab:help', function () {
    var patternlab = patternlab_engine();
    patternlab.help();
  });

/* #CHANGED added update-pattern-only task*/
  gulp.task('patternlab:update_pattern', function(cb){
    var patternlab = patternlab_engine();
    try {
      patternlab.build(false);
    } catch(err) {
      gutil.log(gutil.colors.red(err.message));
      notifier.notify('There were errors while rendering your patterns. Please check your sources...');
    }
    cb();
  });
};
