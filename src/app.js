require('./components/clipboard');
require('./components/uploader');
require('./components/notification');

const { miaotu, wln } = require('./components/icons');
const { app, Tray } = require('electron');

module.exports = nx.declare('ipic.App', {
  statics: {
    init: function() {
      this._clipboard = new ipic.Clipboard();
      this._uploader = new ipic.Uploader();
      this._notification = new ipic.Notification();
      this._changed = false;
    },
    start: function() {
      app.on('ready', () => {
        this._tray = new Tray(miaotu.deactive);
        this.clipWatch();
        this.trayWatch();
      });
    },
    active: function() {
      this._tray.setImage(miaotu.active);
    },
    deactive: function() {
      this._tray.setImage(miaotu.deactive);
    },
    clipWatch: function() {
      this._clipRes = this._clipboard.watch('image-changed', () => {
        this.active();
      });
    },
    trayWatch: function() {
      this._tray.on('click', () => {
        const filepath = this._clipboard.filepath();
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
