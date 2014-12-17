var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    filter = require('gulp-filter'),
    filelog = require('gulp-filelog'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    addStream = require('add-stream'),
    concat = require('gulp-concat'),
    streamSplicer = require('stream-splicer'),
    inject = require('gulp-inject'),
    del = require('del');

gulp.task('build', ['prep-index.html']);

gulp.task('prep-index.html', ['clean', 'prep-scripts'], function() {
  var vendorFile = gulp.src('build/scripts/vendor-*.js', {read: false});
  var appFile = gulp.src('build/scripts/app-*.js', {read: false});

  return gulp.src('app/index.html')
    // replace script tags marked with inject-vendor/endinject with reference
    // to vendor.js
    .pipe(inject(vendorFile, {
      addRootSlash: false,
      ignorePath: 'build/',
      name: 'inject-vendor'
    }))
    // replace script tags marked with inject-app/endinject with reference
    // to app.js
    .pipe(inject(appFile, {
      addRootSlash: false,
      ignorePath: 'build/',
      name: 'inject-app'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function(cb) {
  del(['build'], cb);
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
    // create js file that puts html in angular's $templateCache
    .pipe(angularTemplateCache({
      module: 'app.templates'
    }));
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

gulp.task('default', ['watch']);
