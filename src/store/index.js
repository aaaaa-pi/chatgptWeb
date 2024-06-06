import { createStore } from 'vuex'
import user from './user'
import loading from './loading'

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user,
    loading
  }
})
