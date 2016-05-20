var gulp = require('gulp-help')(require('gulp')),
runSequence = require('run-sequence');
config = require('./config'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
cssnano = require('gulp-cssnano'),
rename = require('gulp-rename'),
replace = require('gulp-replace');
require('./sass');

gulp.task('dist:ftl', ['patternlab:only_patterns'], function() {
  runSequence(['dist:pages','dist:components','dist:subcomponents'], 'dist:yaml');
})

gulp.task('dist:pages', function() {
  return gulp.src([config.paths.temp + '/**/04-pages*.ftl'])
  .pipe(rename(function(path) {
           path.dirname = '',
           path.basename = path.basename.replace('04-pages', 'page')
         }))
  .pipe(gulp.dest(config.paths.final + '/templates/pages/'))
})
gulp.task('dist:components', function() {
  return gulp.src([config.paths.temp + '/**/03-components*.ftl'])
  .pipe(rename(function(path) {
           path.dirname = '',
           path.basename = path.basename.replace('03-components', 'component')
         }))
  .pipe(gulp.dest(config.paths.final + '/templates/components/'))
})
gulp.task('dist:subcomponents', function() {
  return gulp.src([config.paths.temp + '/**/02-subcomponents*.ftl'])
  .pipe(rename(function(path) {
           path.dirname = '',
           path.basename = path.basename.replace('02-subcomponents', 'subcomponent')
         }))
  .pipe(gulp.dest(config.paths.final + '/templates/subcomponents/'))
})

gulp.task('dist', 'create dist(ftl-files) for magnolia', function(callback) {
return runSequence('clean:common', ['dist:ftl', 'dist:css', 'dist:js', 'icons:dist', 'dist:images'], function() {
    callback();
  });
});

gulp.task('styleguide', 'create dist of the styleguide', function(callback) {
  return runSequence('clean:common', 'lab','icons:styleguide', function() {
      callback();
    });
});

gulp.task('combined', 'create both dists', function() {
  return runSequence('clean:common', ['styleguide', 'dist']);
});

// helper to get initial task
gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function(task) {
  this.currentTask = task;
  this.__runTask(task);
}

gulp.task('dist:css', 'moves styles to corresponding dist', ['sass'], function() {
  var callStack = this.seq;
  if (callStack.indexOf('dist') > -1 && callStack.indexOf('styleguide') > -1) {
    // when dist styleguide is called (maven-build)
    return gulp.src([config.paths.temp + '/webresources/**/*.css','!' + config.paths.temp + '/webresources/**/main-unprefixed.css'])
    .pipe(cssnano())
      .pipe(gulp.dest(config.paths.final + '/webresources/'))
      .pipe(gulp.dest(config.paths.styleguide + '/webresources'))
  } else if (callStack.indexOf('dist') > -1 || callStack.indexOf('magnolia') > -1) {
    return gulp.src([config.paths.temp + '/webresources/**/*.css','!' + config.paths.temp + '/webresources/**/main-unprefixed.css'])
      .pipe(cssnano())
      .pipe(gulp.dest(config.paths.final + '/webresources'))
  } else {
    return gulp.src([config.paths.temp + '/webresources/css/**/*.css','!' + config.paths.temp + '/webresources/css/main-unprefixed.css'])
      .pipe(cssnano())
      .pipe(gulp.dest(config.paths.styleguide + '/webresources/css/'))
  }
});
gulp.task('dist:js', 'moves scripts to corresponding dist', ['jslint', 'scripts:libs'], function() {
  var callStack = this.seq;
  if (callStack.indexOf('dist') > -1 && callStack.indexOf('styleguide') > -1) {
    // when dist styleguide is called (maven-build)
    return gulp.src([config.paths.temp + '/webresources/js/libs.js', config.paths.source + '/js/**/*.js', ])
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest(config.paths.final + '/webresources/js/'))
      .pipe(gulp.dest(config.paths.styleguide + '/webresources/js'))
  } else if (callStack.indexOf('dist') > -1) {
    return gulp.src([config.paths.temp + '/webresources/js/libs.js', config.paths.source + '/js/**/*.js', ])
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest(config.paths.final + '/webresources/js'))
  } else {
    return gulp.src([config.paths.temp + '/webresources/js/libs.js', config.paths.source + '/js/**/*.js' ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.styleguide + '/webresources/js'))
  }
});

gulp.task('dist:images', function() {
  return gulp.src([config.paths.source + '/images/**/*'])
  .pipe(gulp.dest(config.paths.final + '/webresources/images/'))
})

gulp.task('scripts:libs', 'concat js-libs into temp', function() {
    return gulp.src(['./node_modules/tether/dist/js/tether.js', './node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/dist/js/bootstrap.js', './node_modules/slick-carousel/slick/slick.js'])
      .pipe(concat('libs.js'))
      .pipe(gulp.dest(config.paths.temp + '/webresources/js/'));
});
