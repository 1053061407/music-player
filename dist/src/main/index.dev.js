'use strict';

process.env.NODE_ENV = 'development';

require('electron-debug')({ showDevTools: false });

require('electron').app.on('ready', function () {
  var installExtension = require('electron-devtools-installer');
  installExtension.default(installExtension.VUEJS_DEVTOOLS).then(function () {}).catch(function (err) {
    console.log('Unable to install `vue-devtools`: \n', err);
  });
});

require('./index');
//# sourceMappingURL=index.dev.js.map