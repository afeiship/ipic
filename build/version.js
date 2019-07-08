(function() {
  'use strict';

  const gulp = require('gulp');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  gulp.task('version', function() {
    return gulp
      .src(['./*.json'])
      .pipe($.bump())
      .pipe(gulp.dest('./'));
  });
})();
