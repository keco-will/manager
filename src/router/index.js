import Vue from 'vue'
import VueRouter from 'vue-router'
import managerRouter from './Manager/Manager';
// import Login from '../views/Manager/managerLogin/login.vue'
Vue.use(VueRouter)

const routes = [
  managerRouter,
   {
     path: '/',
     redirect: '/manager/userlist'
   },

]

const router = new VueRouter({
  mode: 'history',
   base: process.env.BASE_URL,
  // base:'/manager/',
  routes
})

// router.beforeEach((to, from, next) => {
//   let userToken = sessionStorage.getItem('userToken')
//   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//     if (userToken) { // 判断本地是否存在token
//       next();
//     } else {
//       next({
//         path: '/Login'
//       })
//     }
//   } else {
//     next()
//   }
//   /* 如果本地存在token,则不允许直接跳转到登录页面 */
//   if (to.fullPath === '/Login') {
//     if (userToken) {
//       next(false);
//     } else {
//       next()
//     }
//   }
// })



export default router