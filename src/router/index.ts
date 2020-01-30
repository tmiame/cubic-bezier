import Vue from 'vue'
import VueRouter, { RouterOptions, RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Explore from '@/views/Explore.vue'

Vue.use(VueRouter)

const routes = <Array<RouteConfig>>[
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/explore',
    name: 'explore',
    component: Explore
  }
]

const router = new VueRouter(<RouterOptions>{
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes
})

export default router
