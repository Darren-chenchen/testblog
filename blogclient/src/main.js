// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 配置网络
import {configAxios} from './api/basehttp'
import axios from 'axios'

// element
import ElementUI from 'element-ui'
import './common/scss/element.scss'
import VueLazyLoad from 'vue-lazyload'

Vue.use(ElementUI)

Vue.prototype.axios = axios
Vue.prototype.bus = new Vue()

Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('./assets/logo.png')
})
configAxios()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
