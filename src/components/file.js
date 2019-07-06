const atob = require('atob');
const Blob = require('node-blob');
const MIME_RE = /:(.*?);/;
const CHAR = ',';

module.exports = nx.declare('ipic.File', {
  methods: {
    b64ToBlob: function(inDataUrl) {
      var arr = inDataUrl.split(CHAR),
        mime = arr[0].match(MIME_RE)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
  }
});