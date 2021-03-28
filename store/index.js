export const state = () => ({
  currentUser: {
    user: null,
    eventPosts: null
  },
  otherUser: {
    user: null,
    eventPosts: null
  },
  following: [],
  followers: [],
  relationship: false,
  feedItems: [],
  page: 1,
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
    state.currentUser.user = payload
  },
  setOtherUser (state, payload) {
    state.otherUser.user = payload
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
  setRelationship (state, payload) {
    state.relationship = payload
  },
  setUserEventPosts (state, payload) {
    state.currentUser.eventPosts = payload
  },
  setOtherUserEventPosts (state, payload) {
    state.otherUser.eventPosts = payload
  },
  incrementPage (state) {
    state.page++
  },
  updateFeedItems (state, payload) {
    state.feedItems.push(...payload)
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
  getRelationship ({ commit }, boolean) {
    commit('setRelationship', boolean)
  },
  getUserEventPosts ({ commit }, userEventPosts) {
    commit('setUserEventPosts', userEventPosts)
  },
  getOtherUserEventPosts ({ commit }, otherUserEventPosts) {
    commit('setOtherUserEventPosts', otherUserEventPosts)
  },
  async getFeedItems ({ commit, state }, loadState) {
    await this.$axios.$get('/api/v1/eventposts', {
      params: {
        page: state.page
      }
    }).then(function (data) {
      if (state.page <= data.kaminari.pagenation.pages) {
        commit('incrementPage')
        commit('updateFeedItems', data.feed_items)
        loadState.loaded()
      } else {
        loadState.complete()
      }
    })
  }
}
