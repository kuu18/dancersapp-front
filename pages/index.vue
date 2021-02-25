<template>
  <div>
    index.vue
  </div>
</template>

<script>
export default {
  layout: 'welcome',
  middleware ({ store, redirect }) {
    if (store.state.loggedIn) {
      redirect('/home')
    }
  }
}
</script>
