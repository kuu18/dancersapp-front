<template>
  <v-card
    flat
  >
    <v-card-text class="text-center">
      <h2>
        {{ otherUser.user_name }}
      </h2>
    </v-card-text>
    <v-row
      justify="center"
      align-content="center"
      no-gutters
    >
      <v-col
        no-gutters
        cols="12"
        sm="6"
      >
        <v-layout justify-center>
          <v-avatar
            size="150"
            class="hidden-ipad-and-down"
          >
            <img
              :src="avatarUrl"
            >
          </v-avatar>
          <v-avatar
            size="70"
            class="hidden-ipad-and-up"
          >
            <img
              :src="avatarUrl"
            >
          </v-avatar>
        </v-layout>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-card-text>
          <v-btn
            text
            color="black"
            link
            :to="`/${$route.params.userName}/following`"
          >
            フォロー {{ followCount }}
          </v-btn>
          <v-btn
            text
            color="black"
            :to="`/${$route.params.userName}/followers`"
          >
            フォロワー {{ followerCount }}
          </v-btn>
          <v-card-text>
            投稿数 {{ otherUser.eventposts.length }}
          </v-card-text>
        </v-card-text>
        <ui-follow-btn @countup="incrementFollowerCount" @countdown="decrementFollowerCount" />
      </v-col>
    </v-row>
    <v-divider class="mt-3" />
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      followCount: this.$store.state.otherUser.user.active_relationships.length,
      followerCount: this.$store.state.otherUser.user.passive_relationships.length
    }
  },
  computed: {
    eventPosts () {
      return this.$store.state.otherUser.eventPosts
    },
    otherUser () {
      return this.$store.state.otherUser.user
    },
    avatarUrl () {
      return this.$store.state.otherUser.user.avatar_url
    }
  },
  methods: {
    incrementFollowerCount () {
      this.followerCount += 1
    },
    decrementFollowerCount () {
      this.followerCount -= 1
    }
  }
}
</script>
