var glob = require("glob");
var gulp = require("gulp");
var gulpicon = require("gulpicon/tasks/gulpicon");
var config = require('./config');

path = require('path');

var config = require('../patternlab-config.json');
function paths() {
  return config.paths;
}
// grab the config, tack on the output destination
var gulpiconConfig = require("../node_modules/gulpicon/example/config.js");
gulpiconConfig.dest = path.resolve(paths().temp.icons);

// grab the file paths
var files = glob.sync(path.resolve(paths().source.css + '/icons/*.svg'));

// set up the gulp task
gulp.task("icons", gulpicon(files, gulpiconConfig));

gulp.task("icons:dist", gulp.series('icons'), function() {
  return gulp.src(path.resolve(paths().temp.icons +'**/*.{css,js,png}'))
      .pipe(gulp.dest(path.resolve(paths().magnolia.webresources)))
});

gulp.task("icons:styleguide", gulp.series('icons'), function() {
  return gulp.src(path.resolve(paths().temp.icons +'**/*.{css,js,png,html}'))
  .pipe(gulp.dest(path.resolve(paths().public.webresources)))
});
