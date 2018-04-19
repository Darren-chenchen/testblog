// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './common/scss/base.scss'
import './common/scss/element.scss'
import './common/scss/reset.scss'

// 配置网络
import {configAxios} from './components/api/basehttp'
import axios from 'axios'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

Vue.prototype.axios = axios
Vue.prototype.router = router
Vue.prototype.bus = new Vue()

configAxios()

Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
