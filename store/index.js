export const state = () => ({
  current: {
    user: null
  },
  other: {
    user: null
  },
  following: [],
  followers: [],
  relationship: false,
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
  setOtherUser (state, payload) {
    state.other.user = payload
  },
  setUserFollowing (state, payload) {
    state.following = payload
  },
  setUserFollowers (state, payload) {
    state.followers = payload
  },
  setRememberRoute (state, payload) {
    state.rememberRoute = payload
  },
  setToast (state, payload) {
    state.toast = payload
  },
  setEventPosts (state, payload) {
    state.eventPosts = payload
  },
  setRelationship (state, payload) {
    state.relationship = payload
  }
}

export const actions = {
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
  },
  getOtherUser ({ commit }, user) {
    commit('setOtherUser', user)
  },
  getUserFollowing ({ commit }, user) {
    commit('setUserFollowing', user)
  },
  getUserFollowers ({ commit }, user) {
    commit('setUserFollowers', user)
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
  },
  getRelationship ({ commit }, boolean) {
    commit('setRelationship', boolean)
  }
}
