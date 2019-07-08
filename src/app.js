require('./components/clipboard');
require('./components/uploader');
require('./components/notification');
require('./components/file');

const { miaotu, bird } = require('./components/icons');
const { app, Menu, shell, Tray } = require('electron');
const fs = require('fs');

module.exports = nx.declare('ipic.App', {
  properties: {
    filepath: function() {
      return this._clipboard.filepath();
    },
    trayActive: {
      get: function() {
        return this._trayActive;
      },
      set: function(inValue) {
        const statusImg = inValue ? miaotu.active : miaotu.deactive;
        this._tray.setImage(statusImg);
        this.setContextMenu(inValue);
        this._trayActive = inValue;
      }
    }
  },
  statics: {
    init: function() {
      this._clipboard = new ipic.Clipboard();
      this._uploader = new ipic.Uploader();
      this._notification = new ipic.Notification();
      this._file = new ipic.File();
      this._changed = false;
    },
    start: function() {
      app.on('ready', () => {
        this._tray = new Tray(miaotu.deactive);
        this.trayActive = false;
        this.clipWatch();
      });
    },
    setContextMenu: function(inValue) {
      this._trayContextMenu = Menu.buildFromTemplate([
        {
          label: 'Upload',
          enabled: inValue,
          click: () => {
            this.upload();
          }
        },
        { label: 'Quit', role: 'quit' }
      ]);
      this._tray.setContextMenu(this._trayContextMenu);
    },
    active: function() {
      this.trayActive = true;
      this._tray.popUpContextMenu();
    },
    deactive: function() {
      this.trayActive = false;
    },
    clipWatch: function() {
      this._clipRes = this._clipboard.watch('image-changed', () => {
        this.filepath ? this.active() : this.deactive();
      });
    },
    upload: function() {
      const filepath = this.filepath;
      if (filepath) {
        this._tray.setImage(miaotu.normal);
        this._uploader.upload(this._uploader.build(filepath)).then((res) => {
          this.deactive();
          this._clipboard.text = res;
          this._notification.notify({ icon: bird.active }).then(({ code, data }) => {
            if (!code && data.status === 'activate') {
              shell.openExternal(res);
            }
          });
        });
      }
    }
  }
});
