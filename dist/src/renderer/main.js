'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _elementUi = require('element-ui');

var _elementUi2 = _interopRequireDefault(_elementUi);

require('element-ui/lib/theme-chalk/index.css');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

require('./assets/js/iconfont');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!process.env.IS_WEB) _vue2.default.use(require('vue-electron'));
_vue2.default.http = _vue2.default.prototype.$http = _axios2.default;
_vue2.default.config.productionTip = false;

_vue2.default.use(_elementUi2.default);

new _vue2.default({
  components: { App: _App2.default },
  router: _router2.default,
  store: _store2.default,
  template: '<App/>'
}).$mount('#app');
//# sourceMappingURL=main.js.map