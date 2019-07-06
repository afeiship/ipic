const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { app, Menu, Tray, Notification, BrowserWindow } = require('electron');
const clipboard = require('electron-clipboard-extended');

require('next-dump');

// get file path from clipboard:
const upload = require('./services/upload');
const filepath = clipboard.read('public.file-url').replace('file://', '');
const formData = new FormData();
formData.append('smfile', fs.createReadStream(filepath));

upload(formData).then((url) => {
  clipboard.writeText(url);
  const nt = new Notification({
    icon: path.join(__dirname, 'assets/mt_normal@4x.png'),
    title: 'Copyed!',
    silent: true,
    body: 'Write success!'
  });
  nt.show();
});
