const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { app, Menu, Tray, Notification, BrowserWindow } = require('electron');
const clipboard = require('electron-clipboard-extended');
const notifier = require('node-notifier');
const nx = require('next-js-core2');

// get file path from clipboard:
const upload = require('./services/upload');

function getFormData() {
  const filepath = clipboard.read('public.file-url').replace('file://', '');
  const formData = new FormData();
  formData.append('smfile', fs.createReadStream(filepath));
  return formData;
}

clipboard
  .on('image-changed', () => {
    notifier.notify(
      {
        title: 'Copyed',
        message: '上传到CDN?',
        timeout: 10,
        icon: path.join(__dirname, 'assets/mt_normal@4x.png'),
        actions: 'OK',
        closeLabel: 'No,thanks',
        reply: false
      },
      (_, response) => {
        if (response === 'activate') {
          upload(getFormData()).then((url) => {
            clipboard.writeText(url);
          });
        } else {
          clipboard.clear();
        }
      }
    );
  })
  .startWatching();
