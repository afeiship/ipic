module.exports = nx.declare('ipic.File', {
  methods: {
    toBlob: function(inNativeImage) {
      const dataURL = inNativeImage.toDataURL();
      return nx.base64ToBlob(dataURL);
    }
  }
});
