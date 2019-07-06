const packager = require('electron-packager');

// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#extend-info
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
