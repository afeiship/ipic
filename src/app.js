require('./components/clipboard');
require('./components/uploader');
require('./components/notification');

const { app, Tray } = require('electron');
const path = require('path');

module.exports = nx.declare('ipic.App', {
  statics: {
    init: function() {
      this._clipboard = new ipic.Clipboard();
      this._uploader = new ipic.Uploader();
      this._notification = new ipic.Notification();
    },
    start: function() {
      app.on('ready', () => {
        this._tray = new Tray(path.join(__dirname, 'assets/mt_deactive@4x.png'));
        this.clipWatch();
        this.trayWatch();
      });
    },
    clipWatch: function() {
      this._clipRes = this._clipboard.watch('image-changed', () => {
        this._tray.setImage(path.join(__dirname, 'assets/mt_active@4x.png'));
      });
    },
    trayWatch: function() {
      this._tray.on('click', () => {
        const filepath = this._clipboard.filepath();
        const data = this._uploader.buildData(filepath);
        this._tray.setImage(path.join(__dirname, 'assets/mt_normal@4x.png'));
        this._uploader.upload(data).then((res) => {
          this._clipboard.text = res;
          this._tray.setImage(path.join(__dirname, 'assets/mt_deactive@4x.png'));
          this._notification.notify({
            icon: path.join(__dirname, 'assets/wl_icn.png')
          });
        });
      });
    }
  }
});
