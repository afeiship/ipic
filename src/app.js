require('./components/uploader');

// next packages:
require('next-elec-notification');
require('next-elec-clipboard');

const { miaotu, bird } = require('./components/icons');
const { app, Menu, shell, Tray } = require('electron');

module.exports = nx.declare('ipic.App', {
  properties: {
    filepath: function() {
      return this._clipboard.filepath;
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
      this._uploader = new ipic.Uploader();
      this._clipboard = new nx.ElecClipboard();
      this._notification = new nx.ElecNotification({
        title: '复制成功!',
        message: '已经将URL复制到剪贴板',
        sound: true
      });
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
      this._clipboard.on('image-changed', () => {
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
