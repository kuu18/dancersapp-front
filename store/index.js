export const state = () => ({
  current: {
    user: null
  },
  eventPosts: [],
  styles: {
    beforeLogin: {
      appBarHeight: 56
    }
  },
  rememberRoute: {
    name: 'home',
    params: {}
  },
  toast: {
    msg: null,
    color: 'error',
    timeout: 4000
  }
})

export const getters = {}

export const mutations = {
  setCurrentUser (state, payload) {
    state.current.user = payload
  },
  setRememberRoute (state, payload) {
    state.rememberRoute = payload
  },
  setToast (state, payload) {
    state.toast = payload
  },
  setEventPosts (state, payload) {
    state.eventPosts = payload
  }
}

export const actions = {
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
  },
  getRememberRoute ({ commit }, route) {
    route = route || { name: 'home', params: {} }
    commit('setRememberRoute', { name: route.name, params: route.params })
  },
  getToast ({ commit }, toast) {
    toast.color = toast.color || 'error'
    toast.timeout = toast.timeout || 4000
    commit('setToast', toast)
  },
  getEventPosts ({ commit }, eventPosts) {
    commit('setEventPosts', eventPosts)
  }
}
