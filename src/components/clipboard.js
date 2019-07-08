const clipboard = require('electron-clipboard-extended');
module.exports = nx.declare('ipic.Clipboard', {
  properties: {
    text: {
      get: function() {
        return clipboard.readText();
      },
      set: function(inValue) {
        clipboard.writeText(inValue);
      }
    },
    image: function() {
      return clipboard.readImage();
    }
  },
  methods: {
    filepath: function() {
      return clipboard.read('public.file-url').replace('file://', '');
    },
    watch: function(inName, inCallback) {
      clipboard.on(inName, inCallback).startWatching();
      return {
        destroy: function() {
          clipboard.stopWatching();
        }
      };
    },
    clear: function() {
      clipboard.clear();
    }
  }
});
