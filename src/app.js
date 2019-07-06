require('./components/clipboard');
require('./components/uploader');
require('./components/notification');
require('./components/file');

const { miaotu, wln } = require('./components/icons');
const { app, Menu, Tray } = require('electron');

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
        {
          label: 'Quit',
          click: () => {
            this._tray.destroy();
            app.quit();
          }
        }
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
        const data = this._uploader.buildData(filepath);
        this._tray.setImage(miaotu.normal);
        this._uploader.upload(data).then((res) => {
          this.deactive();
          this._clipboard.text = res;
          this._notification.notify({ icon: wln.active });
        });
      }
    }
  }
});
