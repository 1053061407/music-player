'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (a) {
  function b(d) {
    if (c[d]) return c[d].exports;var e = c[d] = { i: d, l: !1, exports: {} };return a[d].call(e.exports, e, e.exports, b), e.l = !0, e.exports;
  }var c = {};return b.m = a, b.c = c, b.d = function (a, c, d) {
    b.o(a, c) || (0, _defineProperty2.default)(a, c, { configurable: !1, enumerable: !0, get: d });
  }, b.n = function (a) {
    var c = a && a.__esModule ? function () {
      return a['default'];
    } : function () {
      return a;
    };return b.d(c, 'a', c), c;
  }, b.o = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }, b.p = '', b(b.s = 0);
}([function (a, b, c) {
  'use strict';
  function d() {
    g = new e.BrowserWindow({ height: 700, useContentSize: !0, width: 1e3 }), g.loadURL(h), g.on('closed', function () {
      g = null;
    });
  }Object.defineProperty(b, '__esModule', { value: !0 });var e = c(1),
      f = c.n(e);global.__static = c(2).join(__dirname, '/static').replace(/\\/g, '\\\\');var g,
      h = 'file://' + __dirname + '/index.html';e.app.on('ready', d), e.app.on('window-all-closed', function () {
    'darwin' !== process.platform && e.app.quit();
  }), e.app.on('activate', function () {
    null === g && d();
  });
}, function (a) {
  a.exports = require('electron');
}, function (a) {
  a.exports = require('path');
}]);
//# sourceMappingURL=main.js.map