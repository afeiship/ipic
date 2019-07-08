(function() {
  ('use strict');

  const gulp = require('gulp');
  const packager = require('electron-packager');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#extend-info

  //clean
  gulp.task('osx:pack', function() {
    return packager({
      dir: '.',
      platform: 'darwin',
      out: 'dist',
      icon: './src/assets/bird.icns',
      overwrite: true,
      extendInfo: {
        LSUIElement: '1'
      }
    });
  });
})();
