// initial state
export default {
  namespaced: true,
  state: {
    loading: false
  },
  actions: {},
  mutations: {
    showLoading(state, payload) {
      state.loading = payload
    }
  }
}
