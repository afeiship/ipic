const path = require('path');
const notifier = require('node-notifier');
const DEFAULT_OPTIONS = {
  title: '复制成功!',
  message: '已经将URL复制到剪贴板',
  sound: true
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
