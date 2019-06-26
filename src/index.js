const electron = require('electron');
const { resolve } = require('path');
const { app, clipboard, BrowserWindow } = require('electron');

function createWindow() {
  let win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile(resolve(__dirname, 'index.html'));
  // win.webContents.openDevTools();
}

app.on('ready', createWindow);
