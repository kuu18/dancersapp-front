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
    followPage: 2
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
  },
  schedules: []
})

export const getters = {}

export const mutations = {
  setCurrentUser (state, payload) {
    state.currentUser.user = payload
  },
  setOtherUser (state, payload) {
    state.otherUser.user = payload
  },
  setInitialUserFollowing (state, payload) {
    state.following = payload
  },
  setInitialUserFollowers (state, payload) {
    state.followers = payload
  },
  setSchedules (state, payload) {
    state.schedules = payload
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
  updateFollowing (state, payload) {
    state.following.push(...payload)
  },
  updateFollowers (state, payload) {
    state.followers.push(...payload)
  },
  incrementFeedPage (state) {
    state.page.feedPage++
  },
  incrementUserPage (state) {
    state.page.userPage++
  },
  incrementFollowPage (state) {
    state.page.followPage++
  },
  setInfiniteReset (state) {
    state.page.userPage = 2
    state.page.followPage = 2
  }
}

export const actions = {
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
  },
  getOtherUser ({ commit }, user) {
    commit('setOtherUser', user)
  },
  getInitialUserFollowing ({ commit }, user) {
    commit('setInitialUserFollowing', user)
  },
  getInitialUserFollowers ({ commit }, user) {
    commit('setInitialUserFollowers', user)
  },
  getSchedules ({ commit }, event) {
    commit('setSchedules', event)
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
        commit('incrementFeedPage')
        commit('updateFeedItems', data.feed_items)
        loadState.loaded()
      } else {
        loadState.complete()
      }
    })
  },
  async getUserFollowing ({ commit, state }, loadState) {
    await this.$axios.$get('/api/v1/users/following', {
      params: {
        page: state.page.followPage,
        user_name: loadState.params
      }
    }).then(function (data) {
      if (state.page.followPage <= data.kaminari.pagenation.pages) {
        commit('incrementFollowPage')
        commit('updateFollowing', data.following)
        loadState.$state.loaded()
      } else {
        loadState.$state.complete()
      }
    })
  },
  async getUserFollowers ({ commit, state }, loadState) {
    await this.$axios.$get('/api/v1/users/following', {
      params: {
        page: state.page.followPage,
        user_name: loadState.params
      }
    }).then(function (data) {
      if (state.page.followPage <= data.kaminari.pagenation.pages) {
        commit('incrementFollowPage')
        commit('updateFollowers', data.following)
        loadState.$state.loaded()
      } else {
        loadState.$state.complete()
      }
    })
  }
}
