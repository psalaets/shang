var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './app/'
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
