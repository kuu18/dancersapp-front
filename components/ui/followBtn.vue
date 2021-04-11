<template>
  <v-card-actions class="mx-auto">
    <v-btn
      v-if="$store.state.relationship === false"
      rounded
      color="primary"
      :loading="loading"
      class="mx-auto hidden-ipad-and-down"
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
      class="mx-auto hidden-ipad-and-down"
      @click="unfollow"
    >
      フォロー解除
      <v-icon>
        mdi-account-check
      </v-icon>
    </v-btn>
    <v-btn
      v-if="$store.state.relationship === false"
      block
      color="primary"
      :loading="loading"
      class="hidden-ipad-and-up"
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
      class="hidden-ipad-and-up"
      @click="unfollow"
    >
      フォロー解除
      <v-icon>
        mdi-account
      </v-icon>
    </v-btn>
  </v-card-actions>
</template>
<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
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
      this.$emit('countup')
    },
    async unfollow () {
      this.loading = true
      await this.$axios.$delete('/api/v1/relationships', { data: { user_name: this.otherUser.user_name } })
        .then(response => this.unfollowSuccessful(response))
      this.loading = false
    },
    unfollowSuccessful (response) {
      this.$store.dispatch('getRelationship', response)
      this.$emit('countdown')
    }
  }
}
</script>
