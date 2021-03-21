import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'my-key',
      paths: [
        'toast'
      ]
    })(store)
  })
}
