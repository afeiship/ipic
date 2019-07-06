const fs = require('fs');
const icnsConvert = require('@fiahfy/icns-convert');

const buf = fs.readFileSync('./src/assets/wln_active.png'); // squre, 1024x1024 pixels or more
icnsConvert(buf).then((data) => {
  fs.writeFileSync('output.icns', data);
});
