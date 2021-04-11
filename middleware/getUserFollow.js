export default async ({ $auth, store, $axios, route }) => {
  if ($auth.loggedIn && route.name === 'userName-following') {
    await $axios.$get('/api/v1/users/following', { params: { page: 1, user_name: route.params.userName } })
      .then(response => store.dispatch('getInitialUserFollowing', response.following))
  } else {
    await $axios.$get('/api/v1/users/followers', { params: { page: 1, user_name: route.params.userName } })
      .then(response => store.dispatch('getInitialUserFollowers', response.followers))
  }
}
