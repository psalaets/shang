var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './app/',
      // don't mirror clicks, scroll, forms across browsers
      ghostMode: false
    }
  });
});

gulp.task('dev', ['serve'], function() {
  gulp.watch([
    'app/**/*.html',
    'app/**/*.js',
    'app/**/*.css'
  ], {}, browserSync.reload);
});

gulp.task('default', ['dev']);
