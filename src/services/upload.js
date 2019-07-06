const fetch = require('node-fetch');

module.exports = function(inData) {
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
};
