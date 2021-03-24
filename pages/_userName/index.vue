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
                  投稿数 {{ eventPosts.length }}
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
                  フォロー {{ otherUser.active_relationships.length }}
                </v-btn>
                <v-btn
                  text
                  color="black"
                  :to="`/${$route.params.userName}/followers`"
                >
                  フォロワー {{ otherUser.passive_relationships.length }}
                </v-btn>
                <v-card-text>
                  投稿数 {{ eventPosts.length }}
                </v-card-text>
              </v-card-text>
              <v-card-actions class="mx-auto hidden-ipad-and-down">
                <v-btn
                  rounded
                  color="primary"
                >
                  フォローする
                  <v-icon>
                    mdi-account
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
                <v-btn block color="primary">
                  フォローする
                  <v-icon>
                    mdi-account
                  </v-icon>
                </v-btn>
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider class="mt-3" />
        </v-card>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="10"
      >
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'loggedIn',
  middleware: ['getUserEventPosts', 'getOtherUser'],
  data ({ $store }) {
    return {
      eventPosts: $store.state.eventPosts,
      otherUser: $store.state.other.user
    }
  }
}
</script>
