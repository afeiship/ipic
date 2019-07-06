require('./components/clipboard');
require('./components/uploader');
require('./components/notification');

module.exports = nx.declare('ipic.App', {
  statics: {
    init: function() {
      this._clipboard = new ipic.Clipboard();
      this._uploader = new ipic.Uploader();
      this._notification = new ipic.Notification();
    },
    start: function() {
      this.attachClipWatcher();
    },
    attachClipWatcher: function() {
      this._clipRes = this._clipboard.watch('image-changed', () => {
        const filepath = this._clipboard.filepath();
        this._notification.notify().then(({ code, data }) => {
          if (!code && data.status === 'activate') {
            const data = this._uploader.buildData(filepath);
            this._uploader.upload(data).then((res) => {
              this._clipboard.text = res;
            });
          } else {
            this._clipboard.clear();
          }
        });
      });
    }
  }
});
