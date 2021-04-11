<template>
  <v-row>
    <v-col
      v-for="(eventPost, i) in eventPosts"
      :key="`eventPost-image-${i}`"
      class="d-flex child-flex"
      cols="4"
    >
      <nuxt-link :to="`/eventpost/${eventPost.id}`">
        <v-img
          :src="eventPost.image_url"
          :lazy-src="eventPost.image_url"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
      </nuxt-link>
    </v-col>
  </v-row>
</template>
<script>
export default {
  computed: {
    eventPosts () {
      if (this.$route.params.userName === this.$auth.user.user_name) {
        return this.$store.state.currentUser.eventPosts
      } else {
        return this.$store.state.otherUser.eventPosts
      }
    }
  }
}
</script>
