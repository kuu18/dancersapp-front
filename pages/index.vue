<template>
  <div>
    index.vue
    <wel-app-var />
  </div>
</template>

<script>
export default {
  layout ({ store }) {
    return store.state.loggedIn ? 'default' : 'welcome'
  }
}
</script>
