const fetch = require('node-fetch');
const fs = require('fs');

module.exports = nx.declare('ipic.Uploader', {
  methods: {
    upload: function(inData) {
      return new Promise((resolve) => {
        fetch('https://sm.ms/api/upload', {
          method: 'POST',
          body: inData,
          headers: inData.getHeaders()
        })
          .then((res) => res.json())
          .then((res) => {
            resolve(res.data.url);
          });
      });
    },
    buildData: function(inTarget) {
      const smfile = typeof inTarget === 'string' ? fs.createReadStream(inTarget) : inTarget;
      return nx.buildFormData({
        smfile
      });
    }
  }
});
