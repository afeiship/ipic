const electron = require('electron');
const { resolve } = require('path');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const { app, Menu, Tray, clipboard, BrowserWindow } = require('electron');

app.on('ready', () => {
  const tray = new Tray(path.join(__dirname, 'assets/mt_gray@4x.png'));

  tray.on('mouse-enter', () => {
    tray.setImage(path.join(__dirname, 'assets/mt_hl@4x.png'));
  });

  tray.on('drop-files', (inEvent, files) => {
    const formData = new FormData();
    formData.append('fkey', '6c12a6478004247efe3e85b748b6dc6a6adb7d321254e30c55f5a237b5ee6be1');
    formData.append('file', fs.createReadStream(files[0]));

    tray.setImage(path.join(__dirname, 'assets/mt@4x.png'));
    tray.setTitle('Uploading');
    fetch('https://stackoverflow.com/upload/image?method=json&https=true', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('res->', res);
      });
  });
});
