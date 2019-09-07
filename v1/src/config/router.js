/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 23:14:43
 * @LastEditTime: 2019-09-07 12:26:18
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: v1,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
})
