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
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <v-avatar
            size="70"
            class="hidden-ipad-and-up"
          >
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
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
            投稿数 {{ eventPosts.length }}
          </v-card-text>
        </v-card-text>
        <v-card-actions class="mx-auto hidden-ipad-and-down">
          <v-btn
            v-if="$store.state.relationship === false"
            rounded
            color="primary"
            :loading="loading"
            @click="follow"
          >
            フォローする
            <v-icon>
              mdi-account
            </v-icon>
          </v-btn>
          <v-btn
            v-if="$store.state.relationship === true"
            outlined
            :loading="loading"
            @click="unfollow"
          >
            フォロー解除
            <v-icon>
              mdi-account-check
            </v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions class="hidden-ipad-and-up">
          <v-btn
            v-if="$store.state.relationship === false"
            block
            color="primary"
            :loading="loading"
            @click="follow"
          >
            フォローする
            <v-icon>
              mdi-account
            </v-icon>
          </v-btn>
          <v-btn
            v-if="$store.state.relationship === true"
            block
            outlined
            :loading="loading"
            @click="unfollow"
          >
            フォロー解除
            <v-icon>
              mdi-account
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-divider class="mt-3" />
  </v-card>
</template>
<script>
export default {
  data ({ $store }) {
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
    }
  },
  methods: {
    async follow () {
      this.loading = true
      await this.$axios.$post('/api/v1/relationships', { user_name: this.otherUser.user_name })
        .then(response => this.followSuccessful(response))
      this.loading = false
    },
    followSuccessful (response) {
      this.$store.dispatch('getRelationship', response)
      this.followerCount += 1
    },
    async unfollow () {
      this.loading = true
      await this.$axios.$delete('/api/v1/relationships', { data: { user_name: this.otherUser.user_name } })
        .then(response => this.unfollowSuccessful(response))
      this.loading = false
    },
    unfollowSuccessful (response) {
      this.$store.dispatch('getRelationship', response)
      this.followerCount -= 1
    }
  }
}
</script>
