<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        md="7"
      >
        <v-card
          v-for="(feed, i) in feedItems"
          :key="`card-${i}`"
          class="mx-auto my-8"
        >
          <eventposts-card-app-bar :item="feed" />
          <nuxt-link :to="`/eventpost/${feed.id}`">
            <v-img
              :src="feed.image_url"
            />
          </nuxt-link>

          <v-card-title>
            {{ feed.event_name }}
          </v-card-title>

          <v-card-subtitle>
            {{ dateFormat(feed.event_date) }}~
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="primary"
              icon
              link
              :to="`/eventpost/${feed.id}`"
            >
              <v-icon>
                mdi-comment-outline
              </v-icon>
              {{ feed.comments.length }}
            </v-btn>
            <eventposts-card-like-btn :eventpost-id="feed.id" />
            <v-btn
              color="orange lighten-2"
              icon
            >
              <v-icon>
                mdi-bookmark-plus-outline
              </v-icon>
            </v-btn>

            <v-spacer />
            <p class="mb-0">
              イベント概要を表示
            </p>
            <v-btn
              icon
              @click="show = !show"
            >
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider />

              <v-card-text>
                {{ feed.content }}
              </v-card-text>
            </div>
          </v-expand-transition>
          <v-card-text v-if="feed.comments.length !== 0">
            <nuxt-link :to="`/eventpost/${feed.id}`" class="text-decoration-none">
              {{ feed.comments.length }}件のコメントをみる
            </nuxt-link>
          </v-card-text>
          <eventposts-card-comment-form :eventpost-id="feed.id" />
          <v-card-text>
            {{ dateFormat(feed.created_at) }}
          </v-card-text>
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
  name: 'Home',
  layout: 'default',
  middleware: 'getInitialFeedItems',
  data () {
    return {
      show: false
    }
  },
  computed: {
    dateFormat () {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium', timeStyle: 'short' }
        )
        return dateTimeFormat.format(new Date(date))
      }
    },
    feedItems () {
      return this.$store.state.feedItems
    }
  },
  methods: {
    infiniteHandler ($state) {
      this.$store.dispatch('getFeedItems', $state)
    }
  }
}
</script>
