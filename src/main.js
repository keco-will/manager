import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import '../public/css/globle.css'

axios.defaults.baseURL = '/';
// axios.defaults.baseURL = 'http://212.64.87.193:8080/';
Vue.config.productionTip = false

Vue.use(ElementUI)
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
