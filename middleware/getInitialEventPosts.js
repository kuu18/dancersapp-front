export default async ({ $auth, store, $axios, route }) => {
  if ($auth.loggedIn && route.params.userName === $auth.user.user_name) {
    await $axios.$get('/api/v1/eventposts/user_eventposts', {
      params: {
        page: 1
      }
    })
      .then(response => store.dispatch('getInitialUserEventPosts', response.eventposts))
  } else {
    await $axios.$get('/api/v1/eventposts/user_eventposts', {
      params: {
        page: 1,
        user_name: route.params.userName
      }
    })
      .then(response => store.dispatch('getInitialOtherUserEventPosts', response.eventposts))
  }
}
