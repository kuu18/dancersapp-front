export default async ({ $auth, store, $axios, route }) => {
  if ($auth.loggedIn && route.params.userName === $auth.user.user_name) {
    await $axios.$get('/api/v1/eventposts/current_user')
      .then(response => store.dispatch('getUserEventPosts', response.eventposts))
  } else {
    await $axios.$get('/api/v1/eventposts/current_user', { params: { user_name: route.params.userName } })
      .then(response => store.dispatch('getOtherUserEventPosts', response.eventposts))
  }
}
