const electron = require('electron');
const { resolve } = require('path');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const fileType = require('file-type');
const { app, Menu, Tray, Notification, BrowserWindow } = require('electron');
const clipboard = require('electron-clipboard-extended');
const FileAPI = require('file-api'),
  File = FileAPI.File;

// import nx.packages
require('next-dump');

const currentImg = clipboard.readImage();

nx.dump(clipboard.read('public.file-url').replace('file://', ''));
