export default {
  namespaced: true,
  state: {
    prompt: localStorage.getItem('prompt') ? localStorage.getItem('prompt') : ''
  },
  actions: {},
  mutations: {
    setPrompt(state, payload) {
      state.prompt = payload.prompt
      localStorage.setItem('prompt', payload.prompt)
    }
  }
}
