var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream');

gulp.task('watch', function() {
  var bundler = browserify({
    // begin options required by watchify
    cache: {},
    packageCache: {},
    fullPaths: true,
    // end options required by watchify
    debug: true // generate inline source maps
  });

  bundler = watchify(bundler);
  bundler.on('update', rebundle);

  // index.js is code's entry point to requiring node modules
  bundler.add('./app/index.js');

  function rebundle() {
    return bundler.bundle()
      // convert regular node stream into gulp compatible stream
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./app/build'));
  }

  return rebundle();
});
