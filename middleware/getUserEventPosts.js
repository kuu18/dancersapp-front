export default async ({ $auth, store, $axios, route }) => {
  if ($auth.loggedIn && route.params.userName === $auth.user.userName) {
    await $axios.$get('/api/v1/eventposts/current_user')
      .then(response => store.dispatch('getEventPosts', response))
  } else {
    await $axios.$get('/api/v1/eventposts/current_user', { params: { user_name: route.params.userName } })
      .then(response => store.dispatch('getEventPosts', response))
  }
}
