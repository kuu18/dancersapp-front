<template>
  <v-navigation-drawer
    v-model="setDrawer"
    app
    clipped
    mobile-breakpoint="960"
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item
        link
        :to="currentUser.user_name"
      >
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ currentUser.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />
      <v-list-item
        v-for="(nav, i) in navMenus"
        :key="`nav-${i}`"
        :to="$my.homeLinkTo(nav.name)"
      >
        <v-list-item-icon>
          <v-icon v-text="nav.icon" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ $my.pageTitle(nav.name) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />

      <v-list-item
        href="https://blog.cloud-acct.com/categories/udemy"
        target="_blank"
      >
        <v-list-item-icon>
          <v-icon>
            mdi-open-in-new
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            このアプリの作り方
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      navMenus: [
        { name: 'home', icon: 'mdi-home' },
        { name: 'events', icon: 'mdi-view-compact' },
        { name: 'search', icon: 'mdi-image' }
      ],
      currentUser: this.$store.state.current.user
    }
  },
  computed: {
    setDrawer: {
      get () { return this.drawer },
      set (val) { return this.$emit('update:drawer', val) }
    }
  }
}
</script>
