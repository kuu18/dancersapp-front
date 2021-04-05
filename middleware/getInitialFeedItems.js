export default async ({ $auth, store, $axios }) => {
  if ($auth.loggedIn) {
    await $axios.$get('/api/v1/eventposts', {
      params: {
        page: 1
      }
    })
      .then(response => store.dispatch('getInitialFeedItems', response.feed_items))
  }
}
