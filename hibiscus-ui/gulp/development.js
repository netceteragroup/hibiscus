var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('./config');
var del = require('del');
var path = require('path');
var browserSync = require('browser-sync');
var bsProxy = browserSync.create("proxy");

function paths() {
    return require('./../patternlab-config.json').paths;
}
require('./clean');

function reload() {
  return bsProxy.reload();
}

function reloadCSS() {
  return bsProxy.reload('*.css');
}

gulp.task('magnolia', gulp.series('dist', function () {
    bsProxy.init({
        proxy: "localhost:8080/magnoliaAuthor",
        port: 9090
    });
    gulp.watch(path.resolve(paths().source.yaml + '**/*.yaml'), { awaitWriteFinish: true }).on('change', gulp.series(/*'clean:magnolia:yaml', 'clean:magnolia:ftl',*/ 'clean:temp', 'dist:ftl', 'dist:yaml',  reload));
    gulp.watch(path.resolve(paths().source.patterns + '**/*.mustache'), { awaitWriteFinish: true }).on('change', gulp.series(/*'clean:magnolia:yaml', 'clean:magnolia:ftl',*/ 'clean:temp', 'dist:ftl', reload));
    gulp.watch(path.resolve(paths().source.css + '**/*.scss'), { awaitWriteFinish: true }).on('change', gulp.series('clean:magnolia:css', 'clean:temp', 'dist:css', reloadCSS));
    gulp.watch(path.resolve(paths().source.js + '**/*.js'), { awaitWriteFinish: true }).on('change', gulp.series('clean:magnolia:js', 'clean:temp', 'dist:js', reload));

}));

gulp.task('magnolia:reload', function () {
    console.log('browser sync reload');
    reloadCSS();
    return;
});
