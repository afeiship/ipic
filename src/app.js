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
    },
    start: function() {
      app.on('ready', () => {
        this._tray = new Tray(miaotu.deactive);
        this.clipWatch();
        this.trayWatch();
      });
    },
    clipWatch: function() {
      this._clipRes = this._clipboard.watch('image-changed', () => {
        this._tray.setImage(miaotu.active);
      });
    },
    trayWatch: function() {
      this._tray.on('click', () => {
        const filepath = this._clipboard.filepath();
        const data = this._uploader.buildData(filepath);
        this._tray.setImage(miaotu.normal);
        this._uploader.upload(data).then((res) => {
          this._clipboard.text = res;
          this._tray.setImage(miaotu.deactive);
          this._notification.notify({ icon: wln.active });
        });
      });
    }
  }
});
