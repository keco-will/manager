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
router.beforeEach((to, from, next) => {
  let userToken = sessionStorage.getItem('userToken')
  let role = sessionStorage.getItem('role')
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (userToken) { // 判断本地是否存在token
      if (to.meta.roles.length !== 0) {
        for (let i = 0; i < to.meta.roles.length; i++) {
          if (role === to.meta.roles[i]) {
            next()
            break
          } else if (i === to.meta.roles.length - 1) {
            next({
              path: '/Error'
            })
          }
        }
      } else {
        next()
      }
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
  /* 如果本地存在token,则不允许直接跳转到登录页面 */
  if (to.fullPath === '/login') {
    if (userToken) {
      if (role === 'manager') {
        next({
          path: '/manager/userlist'
        })
      } else {
        next({
          path: from.fullPath
        })
      }
    } else {
      next()
    }
  }
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