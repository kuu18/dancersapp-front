<template>
  <v-container
    fluid
  >
    <v-row
      v-if="$route.params.userName === $auth.user.user_name"
      justify="center"
      align-content="center"
    >
      <v-col
        cols="12"
        sm="10"
        md="10"
        lg="8"
      >
        <profile-user-profile />
      </v-col>
    </v-row>
    <v-row
      v-else
      justify="center"
      align-content="center"
    >
      <v-col
        cols="12"
        sm="10"
        md="10"
        lg="8"
      >
        <profile-other-user-profile />
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="10"
      >
        <profile-eventposts />
        <infinite-loading
          @infinite="infiniteHandler"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'UserName',
  layout: 'loggedIn',
  middleware: 'getOtherUser',
  destroyed () {
    this.$store.dispatch('getInfiniteReset')
  },
  methods: {
    infiniteHandler ($state) {
      if (this.$route.params.userName === this.$auth.user.user_name) {
        this.$store.dispatch('getUserEventPosts', $state)
      } else {
        const params = this.$route.params.userName
        this.$store.dispatch('getOtherUserEventPosts', { $state, params })
      }
    }
  }
}
</script>
