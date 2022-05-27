import Vue from 'vue'
import VueRouter from 'vue-router'
import GoogleMap from '../views/GoogleMap.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'map',
    component: GoogleMap
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
