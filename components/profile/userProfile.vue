<template>
  <v-card
    flat
  >
    <v-card-text class="text-center">
      <h2>
        {{ $auth.user.user_name }}
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
            :to="`/${$auth.user.user_name}/following`"
          >
            フォロー {{ $auth.user.active_relationships.length }}
          </v-btn>
          <v-btn
            text
            color="black"
            :to="`/${$auth.user.user_name}/followers`"
          >
            フォロワー {{ $auth.user.passive_relationships.length }}
          </v-btn>
          <v-card-text>
            投稿数 {{ eventCount }}
          </v-card-text>
        </v-card-text>
        <v-card-actions class="mx-auto hidden-ipad-and-down">
          <v-btn
            color="primary"
            to="/settings/account"
            rounded
          >
            プロフィール編集
            <v-icon>
              mdi-cog
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="start"
      class="hidden-ipad-and-up"
    >
      <v-col
        cols="12"
      >
        <v-card-text class="text-center p-0">
          <v-btn
            color="primary"
            block
            to="/settings/account"
          >
            プロフィール編集
            <v-icon>
              mdi-cog
            </v-icon>
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
    <v-divider class="mt-3" />
  </v-card>
</template>
<script>
export default {
  computed: {
    eventCount () {
      return this.$store.state.currentUser.user.eventposts.length
    }
  }
}
</script>
