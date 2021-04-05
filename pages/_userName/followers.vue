<template>
  <follow-card>
    <template #follow-card-content>
      <v-container
        fluid
      >
        <v-row>
          <v-col>
            <v-virtual-scroll
              :items="followers"
              height="500"
              item-height="64"
            >
              <template #default="{ item }">
                <v-list-item :key="`foolowers-${item}`">
                  <v-list-item-avatar>
                    <img :src="item.avatar_url">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <nuxt-link :to="`/${item.user_name}`" class="text-decoration-none">
                        {{ item.user_name }}
                      </nuxt-link>
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn link :to="`/${item.user_name}`" text>
                      <v-icon small>
                        mdi-open-in-new
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-divider />
              </template>
            </v-virtual-scroll>
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
