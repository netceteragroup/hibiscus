// var glob = require("glob");
var gulp = require("gulp");
// var gulpicon = require("gulpicon/tasks/gulpicon");
// var config = require('./config');
//
// // grab the config, tack on the output destination
// // var config = require("../node_modules/gulpicon/example/config.js");
// config.dest = "./temp/icons";
//
//
// // grab the file paths
// var files = glob.sync(config.paths.source + '/icons/*.svg');

// set up the gulp task
gulp.task("icons", function() {
  // gulpicon(files, config));
});

gulp.task("icons:dist", 'add gulpicons to dist', ['icons'], function() {
  return gulp.src(config.paths.temp + '/icons/**/*.{css,js,png}')
  .pipe(gulp.dest(config.paths.final + '/webresources/'))
});

gulp.task("icons:styleguide", 'add gulpicons to styleguide', ['icons'], function() {
  return gulp.src(config.paths.temp + '/icons/**/*.{css,js,png,html}')
  .pipe(gulp.dest(config.paths.styleguide + '/webresources'))
});
