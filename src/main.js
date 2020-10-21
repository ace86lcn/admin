import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// style
import '@/assets/scss/reset.scss'
// vue-cookies
import VueCookies from 'vue-cookies'

// request
import request from './utils/request'

import './plugins/element.js'
// import '@/assets/scss/element-variables.scss'
import message from '@/utils/validate'
Vue.prototype.$msg = message


Vue.prototype.$http = request

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.prototype.domain = process.env.VUE_APP_API_URL
Vue.prototype.icon = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591161593761&di=d6d3b3df080e87704677c38f7802e238&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F03%2F88%2F01300000400534127693880874175.jpg'

Vue.use(VueCookies)

Vue.config.productionTip = false

// 面包屑
// Vue.component('BreadCrumb', () => import('@/components/BreadCrumb'))
Vue.component('Pages', () => import('@/components/Pages'))
Vue.component('Search', () => import('@/components/Search'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
