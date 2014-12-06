var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync');

gulp.task('bundle-node-modules', function() {
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
      .on('error', function(error) {
        console.log(error.stack);
        this.emit('end');
      })
      // convert regular node stream into gulp compatible stream
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./app/build'));
  }

  return rebundle();
});

gulp.task('serve', ['bundle-node-modules'], function() {
  browserSync({
    server: {
      baseDir: './app/'
    }
  });
});

gulp.task('dev', ['bundle-node-modules', 'serve'], function() {
  gulp.watch([
    // reload when commonjs bundle changes
    'app/build/bundle.js',
    // reload when main html page changes
    'app/index.html',
    // reload when templates change
    'app/templates/**/*'
  ], {}, browserSync.reload);
});

gulp.task('default', ['dev']);
