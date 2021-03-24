export default async ({ $auth, store, $axios, route }) => {
  if ($auth.loggedIn) {
    await $axios.$get('/api/v1/users/following', { params: { user_name: route.params.userName } })
      .then(response => store.dispatch('getUserFollowing', response))
    await $axios.$get('/api/v1/users/followers', { params: { user_name: route.params.userName } })
      .then(response => store.dispatch('getUserFollowers', response))
  }
}
