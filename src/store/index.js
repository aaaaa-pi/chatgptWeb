import { createStore } from 'vuex'
import user from './user'
import loading from './loading'
import prompt from './prompt'

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user,
    loading,
    prompt
  }
})
