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
          <img :src="avatarUrl">
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item
        link
        :to="`/${currentUser.user_name}`"
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
    </v-list>
    <template #append>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="1000"
      >
        <template #activator="{ on }">
          <v-btn
            class="mx-2"
            color="primary"
            fab
            dark
            v-on="on"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <eventposts-dialog-card
          @change-dialog="changeDialog"
        />
      </v-dialog>
      <span>投稿する</span>
    </template>
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
        { name: 'schedules', icon: 'mdi-calendar-clock' },
        { name: 'search', icon: 'mdi-magnify' }
      ],
      currentUser: this.$store.state.currentUser.user,
      dialog: false,
      avatarUrl: this.$auth.user.avatar_url
    }
  },
  computed: {
    setDrawer: {
      get () { return this.drawer },
      set (val) { return this.$emit('update:drawer', val) }
    }
  },
  methods: {
    changeDialog () {
      this.dialog = !(this.dialog)
    }
  }
}
</script>
