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
    streamSplicer = require('stream-splicer');

gulp.task('prep-scripts', ['prep-app-scripts', 'prep-vendor-scripts']);

gulp.task('prep-app-scripts', function() {
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

gulp.task('prep-vendor-scripts', function() {
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
