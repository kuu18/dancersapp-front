<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        md="8"
      >
        <v-card flat>
          <v-toolbar
            color="myred"
            dark
            flat
          >
            <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>

            <v-spacer />

            <v-btn
              icon
              link
              to="/search/users"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
          <v-tabs color="myred">
            <v-tab
              v-for="(item, i) in items"
              :key="`item-tab-${i}`"
              nuxt
              :to="{name: item.title}"
            >
              <v-icon left>
                {{ item.icon }}
              </v-icon>
              {{ $my.pageTitle(item.title) }}
            </v-tab>

            <v-tabs-items>
              <v-card>
                <slot name="follow-card-content" />
              </v-card>
            </v-tabs-items>
          </v-tabs>
        </v-card>
        <infinite-loading
          @infinite="infiniteHandler"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data ({ $route }) {
    return {
      items: [
        { title: 'userName-following', icon: 'mdi-account-arrow-right-outline' },
        { title: 'userName-followers', icon: 'mdi-account-arrow-left-outline' }
      ],
      pageTitle: this.$my.pageTitle($route.name)
    }
  },
  destroyed () {
    this.$store.dispatch('getInfiniteReset')
  },
  methods: {
    infiniteHandler ($state) {
      if (this.$route.name === 'userName-following') {
        const params = this.$route.params.userName
        this.$store.dispatch('getUserFollowing', { $state, params })
      } else {
        const params = this.$route.params.userName
        this.$store.dispatch('getUserFollowers', { $state, params })
      }
    }
  }
}
</script>
