var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('watch', function(cb) {
  browserSync({
    server: {
      baseDir: './app/',
      // don't mirror clicks, scroll, forms across browsers
      ghostMode: false
    },
    function() {
      gulp.watch([
        'app/**/*.html',
        'app/**/*.js',
        'app/**/*.css'
      ], {}, browserSync.reload);
    }

    // signal to gulp that this task is done
    cb();
  });
});

gulp.task('default', ['watch']);
