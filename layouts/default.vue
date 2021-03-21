<template>
  <v-app>
    <logged-in-header />
    <v-main>
      <ui-toaster />
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'Default',
  middleware: ['authenticator', 'getEventPosts']
}
</script>
