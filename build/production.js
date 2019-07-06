const packager = require('electron-packager');

packager({
  dir: '.',
  platform: 'darwin',
  out: 'dist',
  icon: './src/assets/bird.icns',
  overwrite: true,
  extendInfo: {
    LSUIElement: '1'
  }
});
