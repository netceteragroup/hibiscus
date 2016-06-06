var gulp = require('gulp-help')(require('gulp'));
var extend = require('node.extend');

// project paths
var paths = {
  final: './magnolia-resources/hibiscus-lite',
  source: './source',
  temp: './temp',
  styleguide: './dist-styleguide',
  distStyleguide: ['./dist-styleguide', './temp'],
  cleanup: ['./magnolia-resources/hibiscus-lite', './dist-styleguide', './temp']
};

var config = {
  paths: paths
};

var merged = extend(true,
  {},
  config
);

gulp.task(
  'show-config',
  'Shows the active configuration settings',

  function() {
    console.log(JSON.stringify(merged, null, 2));
  }
);

module.exports = merged;
