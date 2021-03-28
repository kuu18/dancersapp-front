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
          <v-app-bar
            light
            color="white"
          >
            <v-toolbar-title>{{ feed.user.name }}</v-toolbar-title>

            <v-spacer />

            <v-menu
              v-if="feed.user.id === $auth.user.id"
              left
              bottom
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  link
                  @click="destroy(feed.id)"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>削除</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>
          <v-img
            :src="feed.image_url"
          />

          <v-card-title>
            {{ feed.event_name }}
          </v-card-title>

          <v-card-subtitle>
            {{ dateFormat(feed.event_date) }}~
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              <v-icon>
                mdi-comment-outline
              </v-icon>
            </v-btn>
            <v-btn
              color="orange lighten-2"
              text
            >
              <v-icon>
                mdi-heart
              </v-icon>
            </v-btn>
            <v-btn
              color="orange lighten-2"
              text
            >
              <v-icon>
                mdi-bookmark-plus-outline
              </v-icon>
            </v-btn>

            <v-spacer />

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
          <v-card-actions>
            <v-textarea
              class="mx-2"
              label="コメント"
              rows="1"
              prepend-icon="mdi-comment-outline"
            />
          </v-card-actions>
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
  data ($store) {
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
    },
    destroy (eventId) {
      const id = eventId
      this.$axios.$delete('/api/v1/eventposts/' + id)
        .then(response => this.succeeded(response))
    },
    succeeded ({ msg, type }) {
      this.$store.dispatch('getToast', { msg, color: type })
      this.$router.go()
    }
  }
}
</script>
