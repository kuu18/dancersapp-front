<template>
  <v-row>
    <v-col
      v-for="(eventPost, i) in eventPosts"
      :key="`eventPost-image-${i}`"
      class="d-flex child-flex"
      cols="4"
    >
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
    </v-col>
  </v-row>
</template>
<script>
export default {
  data ({ $store }) {
    return {
      eventPosts: $store.state.eventPosts
    }
  }
}
</script>
