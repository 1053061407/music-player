import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import directive from 'element-ui/packages/popover/src/directive';

import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import './assets/js/iconfont'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.directive('popover', directive);
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
