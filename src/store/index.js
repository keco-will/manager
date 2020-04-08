import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    account: '',
  },
  mutations: {
    handleUserName: (state, username) => {
      state.username = username
      sessionStorage.setItem('username', username)
    },
    handleAccount: (state, account) => {
      state.account = account
      sessionStorage.setItem('account', account)
    },
    logout(state) {
      sessionStorage.clear()
      state.username = ''
      state.account = ''
    }
  },
  actions: {},
  modules: {}
})