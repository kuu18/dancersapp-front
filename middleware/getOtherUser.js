export default async ({ $auth, store, $axios, route }) => {
  if ($auth.loggedIn && !(route.params.userName === $auth.user.userNmae)) {
    await $axios.$get('/api/v1/users', { params: { user_name: route.params.userName } })
      .then(response => store.dispatch('getOtherUser', response))
  }
}
