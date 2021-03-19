export default async ({ $auth, store, $axios }) => {
  if ($auth.loggedIn) {
    await $axios.$get('/api/v1/eventposts')
      .then(response => store.dispatch('getEventPosts', response))
  }
}
