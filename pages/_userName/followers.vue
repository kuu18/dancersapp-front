<template>
  <follow-card>
    <template #follow-card-content>
      <v-container
        fluid
      >
        <v-row>
          <v-col>
            <v-list>
              <v-list-item-group
                color="primary"
              >
                <v-list-item
                  v-for="(item, i) in followers"
                  :key="`follower-item-${i}`"
                  :to="`/${item.user_name}`"
                  link
                >
                  <v-list-item-action>
                    <nuxt-link
                      :to="`/${item.user_name}`"
                      class="text-decoration-none"
                    >
                      <v-list-item-avatar>
                        <img
                          :src="item.avatar_url"
                        >
                      </v-list-item-avatar>
                    </nuxt-link>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name" />
                    <v-list-item-subtitle v-text="`@${item.user_name}`" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </follow-card>
</template>
<script>
export default {
  name: 'UserNameFollowers',
  middleware: 'getUserFollow',
  data ({ $store }) {
    return {
      followers: $store.state.followers
    }
  }
}
</script>
