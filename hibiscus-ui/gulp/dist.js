var gulp = require('gulp'),
runSequence = require('run-sequence'),
config = require('./config'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
cssnano = require('gulp-cssnano'),
rename = require('gulp-rename'),
replace = require('gulp-replace');
require('./sass');

path = require('path');

var config = require('../patternlab-config.json');
function paths() {
  return config.paths;
}

gulp.task('dist:pages', function() {
  return gulp.src([path.resolve(paths().temp.root + '/**/04-pages*.ftl')])
  .pipe(rename(function(path) {
           path.dirname = '',
           path.basename = path.basename.replace('04-pages', 'page')
         }))
  .pipe(gulp.dest(path.resolve(paths().magnolia.root + '/templates/pages/')))
});
gulp.task('dist:components', function() {
  return gulp.src([path.resolve(paths().temp.root+ '/**/03-components*.ftl')])
  .pipe(rename(function(path) {
           path.dirname = '',
           path.basename = path.basename.replace('03-components', 'component')
         }))
  .pipe(gulp.dest(path.resolve(paths().magnolia.root + '/templates/components/')))
});
gulp.task('dist:subcomponents', function() {
  return gulp.src([path.resolve(paths().temp.root + '/**/02-subcomponents*.ftl')])
  .pipe(rename(function(path) {
           path.dirname = '',
           path.basename = path.basename.replace('02-subcomponents', 'subcomponent')
         }))
  .pipe(gulp.dest(path.resolve(paths().magnolia.root + '/templates/subcomponents/')))
});
gulp.task('dist:ftl', gulp.series('patternlab:patternsonly', 'dist:pages','dist:components','dist:subcomponents'));

// helper to get initial task
gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function(task) {
  this.currentTask = task;
  this.__runTask(task);
};

gulp.task('dist:css', gulp.series('sass', function() {
var callStack = this.process.argv;
//console.log(callStack)

if (callStack.indexOf('combined') > -1) {
    //console.log('css if')
    // when dist styleguide is called (maven-build)
    return gulp.src([path.resolve(paths().temp.css + '/**/*.css'),'!' + path.resolve(paths().temp.css +'/**/main-unprefixed.css')])
      .pipe(cssnano())
        .pipe(rename(function(path) {
            //console.log(path);
            path.dirname = '';
        }))
      .pipe(gulp.dest(path.resolve(paths().magnolia.css)))
      .pipe(gulp.dest(path.resolve(paths().public.css)))
  } else if (callStack.indexOf('dist') > -1 || callStack.indexOf('magnolia') > -1) {
    //console.log('css else if')
    return gulp.src([path.resolve(paths().temp.css + '/*.css'),'!' + path.resolve(paths().temp.css +'/**/main-unprefixed.css')])
        .pipe(cssnano())
        .pipe(rename(function(path) {
            //console.log(path);
            path.dirname = '';
        }))
      .pipe(gulp.dest(path.resolve(paths().magnolia.css)))
  } else {
    //console.log('css else')
    return gulp.src([path.resolve(paths().temp.css + '/**/*.css'),'!' + path.resolve(paths().temp.css +'/**/main-unprefixed.css')])
      .pipe(cssnano())
        .pipe(rename(function(path) {
            //console.log(path);
            path.dirname = '';
        }))
      .pipe(gulp.dest(path.resolve(paths().public.css)))
  }
}));

gulp.task('dist:js', gulp.series(/*'jslint', 'scripts:libs',*/ function() {
var callStack = this.process.argv
  if (callStack.indexOf('combined') > -1) {
    //console.log('js if')
    // when dist styleguide is called (maven-build)
      return gulp.src('**/*.js', {cwd: path.resolve(paths().source.js)} )
      //.pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest(path.resolve(paths().magnolia.js)))
      .pipe(gulp.dest(path.resolve(paths().public.js)))
  } else if (callStack.indexOf('dist') > -1 || callStack.indexOf('magnolia') > -1) {
    //console.log('js else if')
    return gulp.src('**/*.js', {cwd: path.resolve(paths().source.js)} )
      //.pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest(path.resolve(paths().magnolia.js)))
  } else {
    //console.log('js else')
      return gulp.src('**/*.js', {cwd: path.resolve(paths().source.js)} )
      //.pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest(path.resolve(paths().public.js)))
  }
}));

gulp.task('dist:images', function() {
    return gulp.src(config.paths.source.images + '**/*')
        .pipe(gulp.dest(config.paths.magnolia.images))
});
gulp.task('dist:fonts', function() {
    return gulp.src(config.paths.source.fonts + '**/*')
        .pipe(gulp.dest(config.paths.magnolia.fonts))
});


gulp.task('dist', gulp.series('clean:common', 'dist:ftl', 'dist:css', 'dist:yaml', 'dist:js'/*,'icons:dist'*/, 'dist:images', 'dist:fonts')
//function() {
//  return runSequence('clean:common', 'dist:ftl', 'dist:css' /*,'dist:js', 'icons:dist', 'dist:images'*/);
//}
);

gulp.task('styleguide', gulp.series('clean:common', 'patternlab:build'/*,'icons:styleguide'*/));
//  return runSequence('clean:common', 'lab','icons:styleguide');

gulp.task('combined', gulp.series('clean:common', gulp.parallel('styleguide', 'dist')));
