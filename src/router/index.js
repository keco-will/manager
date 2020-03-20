import Vue from 'vue'
import VueRouter from 'vue-router'
import managerRouter from './Manager/Manager';
import Login from '../views/Manager/managerLogin/login.vue'
Vue.use(VueRouter)

const routes = [
  managerRouter,
  {
    path: '/',
    redirect: '/login'
  },
  {
    name:'login',
    path: '/login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




export default router