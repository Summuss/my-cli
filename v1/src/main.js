/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 23:11:42
 * @LastEditTime: 2019-09-06 23:14:05
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
import './config/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
