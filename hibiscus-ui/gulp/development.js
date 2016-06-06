var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');
var config = require('./config');
var del = require('del');
var path = require('path');
var browserSync = require('browser-sync');
var bsProxy = browserSync.create("proxy");

function paths() {
    return require('./../patternlab-config.json').paths;
}
require('./patternlab');

gulp.task('default', 'run patternlab', ['serve'], function () {
});

gulp.task('serve', function () {
    return runSequence('connect');
});

gulp.task('magnolia', 'create dist(ftl-files) for magnolia without clean', function () {
    runSequence('dist');
    bsProxy.init({
        proxy: "localhost:8080",
        port: 9090
    });
    gulp.watch(path.resolve(paths().source.yaml, '**/*.yaml'), function () {
        runSequence('clean:magnolia:yaml', 'clean:magnolia:ftl', 'clean:temp', 'dist:ftl', 'magnolia:reload');
    });
    gulp.watch(path.resolve(paths().source.patterns, '**/*.mustache'), function () {
        runSequence('clean:magnolia:yaml', 'clean:magnolia:ftl', 'clean:temp', 'dist:ftl', 'magnolia:reload');
    });
    gulp.watch(path.resolve(paths().source.css, '**/*.scss'), function () {
        runSequence('clean:magnolia:css', 'clean:temp', 'dist:css', 'magnolia:reload');
    });
    gulp.watch(path.resolve(paths().source.js, '**/*.js'), function () {
        runSequence('clean:magnolia:js', 'clean:temp', 'dist:js', 'magnolia:reload');
    });
});

gulp.task('magnolia:reload', 'browsersync reload for magnolia', function (callback) {
    console.log('browser sync reload');
    bsProxy.reload();
    callback();
});
