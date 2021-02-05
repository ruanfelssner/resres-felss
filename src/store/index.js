import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorites: [],
    commentary: [],
    user: {}
  },
  mutations: {
    setFavorite (state, payload) { state.favorites.push(payload) },
    removeFavorite (state, payload) {
      for (const item in state.favorites) {
        if (state.favorites[item] === payload) {
          state.favorites.splice(item, 1)
        }
      }
    },
    setComentarios (state, payload) {
      state.commentary.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
