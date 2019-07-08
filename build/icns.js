(function() {
  ('use strict');

  const fs = require('fs');
  const icnsConvert = require('@fiahfy/icns-convert');

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  //clean
  gulp.task('icns', function() {
    const buf = fs.readFileSync('./src/assets/wln_active.png'); // squre, 1024x1024 pixels or more
    return icnsConvert(buf).then((data) => {
      fs.writeFileSync('output.icns', data);
    });
  });
})();
