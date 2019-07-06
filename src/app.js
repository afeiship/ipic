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
        this.clipWatch();
        this.trayWatch();
        this.setContextMenu();
      });
    },
    setContextMenu: function() {
      const contextMenu = Menu.buildFromTemplate([
        {
          label: 'Quit',
          click: () => {
            app.quit();
          }
        }
      ]);
      this._tray.setContextMenu(contextMenu);
    },
    active: function() {
      this._tray.setImage(miaotu.active);
    },
    deactive: function() {
      this._tray.setImage(miaotu.deactive);
    },
    clipWatch: function() {
      this._clipRes = this._clipboard.watch('image-changed', () => {
        this.filepath ? this.active() : this.deactive();
      });
    },
    trayWatch: function() {
      this._tray.on('click', () => {
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
      });
    }
  }
});
