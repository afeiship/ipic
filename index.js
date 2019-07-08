const nx = require('next-js-core2');
const Blob = require('node-blob');
const FormData = require('form-data');
const atob = require('atob');


// next packages
require('next-build-form-data');
require('next-dump');
require('next-base64-to-blob');

// ployfill for electron
nx.mix(nx.GLOBAL, { Blob, FormData, atob });

require('./src/app.js').start();
