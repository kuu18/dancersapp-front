export default async ({ $auth, store, $axios }) => {
  if ($auth.loggedIn) {
    await $axios.$get('/api/v1/schedules/my_schedules')
      .then(response => store.dispatch('getSchedules', response))
  }
}
