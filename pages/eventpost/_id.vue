<template>
  <logged-in-container>
    <template #my-content>
      <v-row
        no-gutters
        justify="center"
        align="center"
      >
        <v-col cols="12" md="10" class="my-10 text-center">
          <v-card
            class="mx-auto"
          >
            <v-row>
              <v-col cols="12" sm="6">
                <v-card-title>
                  {{ eventpost.event_name }}
                </v-card-title>
                <v-img
                  max-height="700"
                  :src="eventpost.image_url"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <eventposts-card-app-bar :item="eventpost" />
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-virtual-scroll
                        :bench="benched"
                        :items="items"
                        height="500"
                        item-height="80"
                      >
                        <template #default="{ item }">
                          <v-list-item :key="`comment-${item}`">
                            <v-list-item-action>
                              <nuxt-link
                                :to="`/${item.user.user_name}`"
                                class="text-decoration-none"
                              >
                                <v-list-item-avatar>
                                  <img
                                    :src="item.user.avatar_url"
                                  >
                                </v-list-item-avatar>
                              </nuxt-link>
                            </v-list-item-action>

                            <v-list-item-content>
                              {{ item.content }}
                            </v-list-item-content>

                            <v-list-item-action v-if="$auth.user.user_name === item.user.user_name">
                              <v-btn icon @click="commentDelete(item.id)">
                                <v-icon small>
                                  mdi-bucket-outline
                                </v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                          <v-divider />
                        </template>
                      </v-virtual-scroll>
                      <v-card-text>{{ eventpost.comments.length }}件のコメント</v-card-text>
                      <eventposts-card-comment-form :eventpost-id="eventpost.id" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card-title>{{ dateFormat(eventpost.event_date) }}〜</v-card-title>
                <v-card-subtitle>イベント概要</v-card-subtitle>
                <v-card-text>{{ eventpost.content }}</v-card-text>
                <v-card-actions>
                  <eventposts-card-like-btn :eventpost-id="eventpost.id" />
                  <v-btn
                    color="orange lighten-2"
                    icon
                  >
                    <v-icon>
                      mdi-bookmark-plus-outline
                    </v-icon>
                  </v-btn>
                  <v-spacer />
                  <p>{{ dateFormat(eventpost.created_at) }}</p>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </logged-in-container>
</template>
<script>
export default {
  layout: 'default',
  async asyncData ({ route, $axios }) {
    const eventpost = await $axios.$get('/api/v1/eventposts/current_eventpost', { params: { eventpost_id: route.params.id } })
    return { eventpost }
  },
  data () {
    return {
      benched: 0
    }
  },
  computed: {
    items () {
      return this.eventpost.comments
    },
    dateFormat () {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium', timeStyle: 'short' }
        )
        return dateTimeFormat.format(new Date(date))
      }
    }
  },
  methods: {
    async commentDelete (commentId) {
      await this.$axios.$delete('/api/v1/comments', { data: { comment_id: commentId } })
        .then(this.$router.go())
    }
  }
}
</script>
<style lang="scss" scoped>
.my-avatar {
  margin-right: 8px;
}
</style>
