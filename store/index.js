export const state = () => ({
  currentUser: {
    user: null,
    eventPosts: []
  },
  otherUser: {
    user: null,
    eventPosts: []
  },
  following: [],
  followers: [],
  relationship: false,
  feedItems: [],
  page: {
    feedPage: 2,
    userPage: 2,
    otherUserPage: 2
  },
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
  setInitialFeedItems (state, payload) {
    state.feedItems = payload
  },
  setInitialUserEventPosts (state, payload) {
    state.currentUser.eventPosts = payload
  },
  setInitialOtherUserEventPosts (state, payload) {
    state.otherUser.eventPosts = payload
  },
  updateFeedItems (state, payload) {
    state.feedItems.push(...payload)
  },
  updateUserEventPosts (state, payload) {
    state.currentUser.eventPosts.push(...payload)
  },
  updateOtherUserEventPosts (state, payload) {
    state.otherUser.eventPosts.push(...payload)
  },
  incrementFeedPage (state) {
    state.page.feedPage++
  },
  incrementUserPage (state) {
    state.page.userPage++
  },
  incrementOtherUserPage (state) {
    state.page.otherUserPage++
  },
  setInfiniteReset (state) {
    state.currentUser.eventPosts = []
    state.otherUser.eventPosts = []
    state.page.userPage = 2
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
  getInitialFeedItems ({ commit }, feedItems) {
    commit('setInitialFeedItems', feedItems)
  },
  getInitialUserEventPosts ({ commit }, eventposts) {
    commit('setInitialUserEventPosts', eventposts)
  },
  getInitialOtherUserEventPosts ({ commit }, eventposts) {
    commit('setInitialOtherUserEventPosts', eventposts)
  },
  getInfiniteReset ({ commit }) {
    commit('setInfiniteReset')
  },
  async getOtherUserEventPosts ({ commit, state }, loadState) {
    await this.$axios.$get('/api/v1/eventposts/user_eventposts', {
      params: {
        page: state.page.userPage,
        user_name: loadState.params
      }
    }).then(function (data) {
      if (state.page.userPage <= data.kaminari.pagenation.pages) {
        commit('incrementUserPage')
        commit('updateOtherUserEventPosts', data.eventposts)
        loadState.$state.loaded()
      } else {
        loadState.$state.complete()
      }
    })
  },
  async getUserEventPosts ({ commit, state }, loadState) {
    await this.$axios.$get('/api/v1/eventposts/user_eventposts', {
      params: {
        page: state.page.userPage
      }
    }).then(function (data) {
      if (state.page.userPage <= data.kaminari.pagenation.pages) {
        commit('incrementUserPage')
        commit('updateUserEventPosts', data.eventposts)
        loadState.loaded()
      } else {
        loadState.complete()
      }
    })
  },
  async getFeedItems ({ commit, state }, loadState) {
    await this.$axios.$get('/api/v1/eventposts', {
      params: {
        page: state.page.feedPage
      }
    }).then(function (data) {
      if (state.page.feedPage <= data.kaminari.pagenation.pages) {
        commit('incrementOtherUserPage')
        commit('updateFeedItems', data.feed_items)
        loadState.loaded()
      } else {
        loadState.complete()
      }
    })
  }
}
