var gulp                 = require('gulp'),
    useref               = require('gulp-useref'),
    filter               = require('gulp-filter'),
    filelog              = require('gulp-filelog'),
    ngAnnotate           = require('gulp-ng-annotate'),
    uglify               = require('gulp-uglify'),
    rev                  = require('gulp-rev'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    concat               = require('gulp-concat'),
    inject               = require('gulp-inject'),
    minifyCss            = require('gulp-minify-css'),
    minifyHtml           = require('gulp-minify-html'),
    angularHtmlify       = require('gulp-angular-htmlify'),

    addStream            = require('add-stream'),
    browserSync          = require('browser-sync'),
    del                  = require('del'),
    streamSplicer        = require('stream-splicer'),
    karma                = require('karma').server;

gulp.task('gh-pages', ['build'], function() {
  console.log('Copying files to project root:')

  // copy stuff in build dir to project root
  return gulp.src('build/**/*')
    .pipe(gulp.dest('.'))
    .pipe(filelog());
});

gulp.task('build', ['prep-index.html']);

gulp.task('prep-index.html', ['clean', 'prep-scripts', 'prep-styles', 'prep-fonts'], function() {
  var vendorScripts = gulp.src('build/scripts/vendor-*.js', {read: false});
  var appScripts = gulp.src('build/scripts/app-*.js', {read: false});

  var vendorStyles = gulp.src('build/styles/vendor-*.css', {read: false});

  return gulp.src('app/index.html')
    // replace script tags in inject/endinject with vendor.js
    .pipe(inject(vendorScripts, {
      addRootSlash: false,
      ignorePath: 'build/',
      name: 'inject-vendor-scripts'
    }))
    // replace script tags in inject/endinject with app.js
    .pipe(inject(appScripts, {
      addRootSlash: false,
      ignorePath: 'build/',
      name: 'inject-app-scripts'
    }))
    // replace script tags in inject/endinject with vendor.css
    .pipe(inject(vendorStyles, {
      addRootSlash: false,
      ignorePath: 'build/',
      name: 'inject-vendor-styles'
    }))
    .pipe(fixDataAttributesAndMinifyHtml())
    .pipe(gulp.dest('build'));
});

gulp.task('prep-scripts', ['prep-app.js', 'prep-vendor.js']);

gulp.task('prep-app.js', ['clean'], function() {
  return gulp.src('app/index.html')
    // concat files between build/endbuild comments into a file named according
    // to build block params
    .pipe(useref.assets())
    // filter down to just app file
    .pipe(filter('app.js'))
    // tack inlined templates onto app.js
    .pipe(addStream.obj(inlineTemplates()))
    .pipe(concat('app.js'))
    // make our angular code minifiable
    .pipe(ngAnnotate())
    .pipe(minifyRevAndWrite());
});

function inlineTemplates() {
  // grab any html file *except* index.html
  return gulp.src('app/**/!(index).html')
    .pipe(fixDataAttributesAndMinifyHtml())
    // create js file that puts html in angular's $templateCache
    .pipe(angularTemplateCache({
      module: 'app.templates'
    }));
}

function fixDataAttributesAndMinifyHtml() {
  return streamSplicer.obj([
    // convert ng-foo attributes to data-ng-foo
    angularHtmlify(),
    // minify - remove marker comments and other stuff
    minifyHtml({
      // preserve empty attributes (removing would break our angular stuff)
      empty: true,
      // preserve quotes
      quotes: true
    })
  ]);
}

function minifyRevAndWrite() {
  return streamSplicer.obj([
    // minify
    uglify(),
    // give unique name based on file contents
    rev(),
    gulp.dest('build/scripts')
  ]);
}

gulp.task('prep-vendor.js', ['clean'], function() {
  return gulp.src('app/index.html')
    // concat files between build/endbuild comments into a file named according
    // to build block params
    .pipe(useref.assets())
    // filter down to just vendor file
    .pipe(filter('vendor.js'))
    .pipe(minifyRevAndWrite());
});

// glyphicons, bootstrap needs these at ../fonts/ relative to css file
gulp.task('prep-fonts', ['clean'], function() {
  gulp.src('app/bower_components/bootstrap/fonts/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('prep-styles', ['clean'], function() {
  return gulp.src('app/index.html')
    // concat files between build/endbuild comments into a file named according
    // to build block params
    .pipe(useref.assets())
    // filter down to just css files
    .pipe(filter('*.css'))
    // minify
    .pipe(minifyCss())
    // give unique filename based on file contents
    .pipe(rev())
    .pipe(gulp.dest('build/styles'));
});

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('watch', function(cb) {
  browserSync({
    server: {
      baseDir: './app/',
      // don't mirror clicks, scroll, forms across browsers
      ghostMode: false
    }
  },
  function() {
    gulp.watch([
      'app/**/*.html',
      'app/**/*.js',
      'app/**/*.css'
    ], {}, browserSync.reload);

    // signal to gulp that this task is done
    cb();
  });
});

gulp.task('test', function(cb) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, cb);
});

gulp.task('default', function() {
  console.log();
  console.log('Available tasks:');
  console.log();
  console.log('  watch      Serve page locally with auto-refresh');
  console.log('  build      Create deployable files in build/');
  console.log('  gh-pages   Move deployable files to project root dir');
  console.log('  test       Run karma once. Use `npm run karma` for {singleRun: false, autoWatch: true}');
  console.log();
});
