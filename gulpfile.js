var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    filter = require('gulp-filter'),
    filelog = require('gulp-filelog'),
    ngAnnotate = require('gulp-ng-annotate'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev')

gulp.task('prep-js', function() {
  return gulp.src('app/index.html')
    // concat files between build/endbuild comments into a file named according
    // to build block params
    .pipe(useref.assets())
    // filter down to just js files (i.e. no css)
    .pipe(filter('*.js'))
    // make our angular code minifiable
    .pipe(gulpif(/app.js/, ngAnnotate()))
    // minify
    .pipe(uglify())
    // give unique filename based on file contents
    .pipe(rev())
    .pipe(gulp.dest('build/scripts'))
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
