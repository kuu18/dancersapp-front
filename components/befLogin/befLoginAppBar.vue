<template>
  <v-app-bar
    app
    :height="appBarHeight"
    dark
  >
    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <ui-app-logo />
    </nuxt-link>

    <ui-app-title
      class="hidden-mobile-and-down"
    />

    <v-spacer />

    <bef-login-signup-link />
    <bef-login-login-link />
  </v-app-bar>
</template>

<script>
export default {
  data ({ $store }) {
    return {
      appBarHeight: $store.state.styles.beforeLogin.appBarHeight
    }
  }
}
</script>
