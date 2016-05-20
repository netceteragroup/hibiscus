// copy from node_modules/patternlab-node/gulpfile.js (with adjustments to file references)
// added cp:styleguide-task and disabled scss-transpilation

// Special thanks to oscar-g (https://github.com/oscar-g) for starting this at https://github.com/oscar-g/patternlab-node/tree/dev-gulp

/* #CHANGED altered package.json path*/
    var pkg = require('./../node_modules/patternlab-node/package.json'),
    gulp = require('gulp'),
    path = require('path'),
    eol = require('os').EOL,
    strip_banner = require('gulp-strip-banner'),
    header = require('gulp-header'),
    nodeunit = require('gulp-nodeunit'),
    eslint = require('gulp-eslint'),
		sass = require('gulp-sass'),
    config = require('./config'),
    browserSync = require('browser-sync').create();

/* #CHANGED required sass*/
require('./sass');

require('gulp-load')(gulp);
var banner = [ '/** ',
  ' * <%= pkg.name %> - v<%= pkg.version %> - <%= today %>',
  ' * ',
  ' * <%= pkg.author %>, and the web community.',
  ' * Licensed under the <%= pkg.license %> license.',
  ' * ',
  ' * Many thanks to Brad Frost and Dave Olsen for inspiration, encouragement, and advice.',
  ' * ', ' **/'].join(eol);

function paths() {
  /* #CHANGED altered config path */
  return require('./../patternlab-config.json').paths;
}

//load patternlab-node tasks
gulp.loadTasks(__dirname + '/core/lib/patternlab_gulp.js');

//clean patterns dir


//build the banner
gulp.task('banner', function () {
  return gulp.src([
    /* #CHANGED altered most /core/lib paths*/
    './core/lib/patternlab.js',
    './../../node_modules/patternlab-node/core/lib/object_factory.js',
    './../../node_modules/patternlab-node/core/lib/lineage_hunter.js',
    './../../node_modules/patternlab-node/core/lib/media_hunter.js',
    './../../node_modules/patternlab-node/core/lib/patternlab_grunt.js',
    './core/lib/patternlab_gulp.js',
    './../../node_modules/patternlab-node/core/lib/parameter_hunter.js',
    './../../node_modules/patternlab-node/core/lib/pattern_exporter.js',
    './../../node_modules/patternlab-node/core/lib/pattern_assembler.js',
    './../../node_modules/patternlab-node/core/lib/pseudopattern_hunter.js',
    './../../node_modules/patternlab-node/core/lib/list_item_hunter.js',
    './../../node_modules/patternlab-node/core/lib/style_modifier_hunter.js'
  ])
    .pipe(strip_banner())
    .pipe(header(banner, {
      pkg : pkg,
      today : new Date().getFullYear() }
    ))
    .pipe(gulp.dest('./core/lib'));
});


// COPY TASKS

// JS copy
/* #CHANGED added dist:js pre-task*/
gulp.task('cp:js', ['dist:js'], function () {
  return gulp.src('**/*.js', {cwd: path.resolve(paths().source.js)})
    .pipe(gulp.dest(path.resolve(paths().public.js)))
    .pipe(browserSync.stream());
});

// Data copy
gulp.task('cp:data', function () {
  return gulp.src('annotations.js', {cwd: path.resolve(paths().source.data)})
    .pipe(gulp.dest(path.resolve(paths().public.data)));
});

// CSS Copy
/* #CHANGED added dist:css pre-task*/
gulp.task('cp:css', ['dist:css'], function () {
  return gulp.src(path.resolve(paths().source.css, 'style.css'))
    .pipe(gulp.dest(path.resolve(paths().public.css)))
    .pipe(browserSync.stream());
});

// Styleguide Copy
gulp.task('cp:styleguide', function () {
  return gulp.src(
      ['**/*'],
      {cwd: path.resolve(paths().source.styleguide)})
      .pipe(gulp.dest(path.resolve(paths().public.styleguide)))
      .pipe(browserSync.stream());
});

// server and watch tasks
gulp.task('connect', ['lab'],  function () {
  browserSync.init({
    server: {
      baseDir: path.resolve(paths().public.root)
    },
    /* #CHANGED added port-number*/
    port: 55505,
    snippetOptions: {
      // Ignore all HTML files within the templates folder
      blacklist: ['/index.html', '/', '/?*']
    },
    notify: {
      styles: [
        'display: none',
        'padding: 15px',
        'font-family: sans-serif',
        'position: fixed',
        'font-size: 1em',
        'z-index: 9999',
        'bottom: 0px',
        'right: 0px',
        'border-top-left-radius: 5px',
        'background-color: #1B2032',
        'opacity: 0.4',
        'margin: 0',
        'color: white',
        'text-align: center'
      ]
    }
  });
  /* #CHANGED altered scss-watch-task, added js-watch-task*/
 gulp.watch(path.resolve(paths().source.css, '**/*.scss'), ['scss-pipe']);
 gulp.watch(path.resolve(paths().source.js, '**/*.js'), ['js-pipe']);

  gulp.watch(path.resolve(paths().source.styleguide, '**/*.*'), ['cp:styleguide']);

  gulp.watch(
    [
      path.resolve(paths().source.patterns, '**/*.mustache'),
      path.resolve(paths().source.patterns, '**/*.json'),
      path.resolve(paths().source.fonts + '/*'),
      path.resolve(paths().source.images + '/*'),
      path.resolve(paths().source.data + '*.json')
    ],
    ['lab-pipe'],
    function () { browserSync.reload(); }
  );

});

/* #CHANGED altered update_pattern-task*/
gulp.task('lab-pipe', ['patternlab:update_pattern'], function(cb){
  cb();
  browserSync.reload();
})
/* #CHANGED added scss-watch-update-task*/
gulp.task('scss-pipe', ['cp:css'], function(cb){
  cb();
  browserSync.reload();
})
/* #CHANGED added js-watch-update-task*/
gulp.task('js-pipe', ['cp:js'], function(cb){
  cb();
  browserSync.reload();
})

/* #CHANGED added asset-subtasks to asset-task, disabled tasks*/
gulp.task('assets', [/*'cp:js', */'cp:img', /*, 'cp:font', */'cp:data', 'dist:css', 'dist:js', 'cp:styleguide' ]);


gulp.task('version', ['patternlab:version']);
/* #CHANGED disabled help task overwrite*/
//gulp.task('help', ['patternlab:help']);
