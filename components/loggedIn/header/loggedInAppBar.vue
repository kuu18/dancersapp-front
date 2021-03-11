<template>
  <v-app-bar
    app
    dark
    dense
    elevation="1"
    clipped-left
  >
    <slot name="nav-icon" />
    <nuxt-link
      to="/home"
      class="text-decoration-none"
    >
      <ui-app-logo />
    </nuxt-link>

    <ui-app-title />

    <v-spacer />
    <nuxt-link
      to="/home"
      class="text-decoration-none"
    >
      <v-btn
        icon
      >
        <v-icon>
          mdi-home
        </v-icon>
      </v-btn>
    </nuxt-link>

    <v-menu
      app
      offset-x
      offset-y
      max-width="200"
    >
      <template #activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-subheader>
          ログイン中のユーザー
        </v-subheader>

        <v-list-item
          :to="currentUser.user_name"
        >
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ $auth.user.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-subheader>
          アカウント
        </v-subheader>

        <template v-for="(menu, i) in accountMenus">
          <v-divider
            v-if="menu.divider"
            :key="`menu-divider-${i}`"
          />

          <v-list-item
            :key="`menu-list-${i}`"
            :to="{ name: menu.name }"
          >
            <v-list-item-icon class="mr-2">
              <v-icon size="22" v-text="menu.icon" />
            </v-list-item-icon>
            <v-list-item-title>
              {{ $my.pageTitle(menu.name) }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      accountMenus: [
        { name: 'settings-account', icon: 'mdi-account-cog' },
        { name: 'settings-password', icon: 'mdi-lock-outline' },
        { name: 'logout', icon: 'mdi-logout-variant', divider: true }
      ],
      currentUser: this.$store.state.current.user
    }
  }
}
</script>
