const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { app, Menu, Tray, Notification, BrowserWindow } = require('electron');
const clipboard = require('electron-clipboard-extended');
const nx = require('next-js-core2');

// next packages
require('next-build-form-data');
require('next-dump');

const App = require('./app.js');
App.start();
