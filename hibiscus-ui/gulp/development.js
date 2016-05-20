var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');
var config = require('./config');
require('./patternlab');

gulp.task('default', 'run patternlab', ['serve'], function() {
});

gulp.task('serve', function() {
return runSequence('icons:styleguide', 'connect');
});
