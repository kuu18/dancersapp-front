export default async ({ $auth, store, $axios, route }) => {
  if ($auth.loggedIn && !(route.params.userName === $auth.user.user_name)) {
    await $axios.$get('/api/v1/users', { params: { user_name: route.params.userName } })
      .then(function (response) {
        store.dispatch('getOtherUser', response.other_user)
        store.dispatch('getRelationship', response.relationship)
      })
  }
}
