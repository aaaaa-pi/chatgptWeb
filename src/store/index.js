import { createStore } from 'vuex'
import user from './user'
import loading from './loading'
import prompt from './prompt'
import auth from './auth'

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user,
    auth,
    loading,
    prompt
  }
})
