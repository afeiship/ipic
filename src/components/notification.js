const path = require('path');
const notifier = require('node-notifier');
const DEFAULT_OPTIONS = {
  title: 'Copyed',
  message: '上传到CDN?',
  timeout: 10,
  icon: path.join(__dirname, 'assets/mt_normal@4x.png'),
  actions: 'OK',
  closeLabel: 'No,thanks',
  reply: false
};
module.exports = nx.declare('ipic.Notification', {
  methods: {
    notify: function(inOptions) {
      const options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      return new Promise((resolve, reject) => {
        notifier.notify(options, (err, response, data) => {
          if (!err) {
            resolve({ code: 0, data: nx.mix(data, { status: response }) });
          } else {
            reject({ code: -1, data: err });
          }
        });
      });
    }
  }
});
