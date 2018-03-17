'use strict';

var _electron = require('electron');

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

var mainWindow = void 0;
var winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9080' : 'file://' + __dirname + '/index.html';

function createWindow() {
  mainWindow = new _electron.BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 1000
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

_electron.app.on('ready', createWindow);

_electron.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
//# sourceMappingURL=index.js.map