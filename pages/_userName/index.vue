<template>
  <div id="profile">
    <v-container
      fluid
    >
      <v-row
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
            <div>
              <v-card-text class="text-center">
                <h2>
                  {{ $auth.user.user_name }}
                </h2>
              </v-card-text>
            </div>
            <v-row
              justify="center"
              align-content="center"
              no-gutters
            >
              <v-col
                no-gutters
                cols="12"
                lg="9"
                md="8"
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
                  <v-card-text>
                    <v-btn
                      text
                      color="black"
                    >
                      フォロ-
                    </v-btn>
                    <v-btn
                      text
                      color="black"
                    >
                      フォロワー
                    </v-btn>
                    <v-card-text>
                      投稿数
                    </v-card-text>
                  </v-card-text>
                  <v-card-actions class="mx-auto hidden-ipad-and-down">
                    <v-btn>
                      プロフィール編集
                      <v-icon>
                        mdi-cog-outline
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-layout>
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
                    block
                  >
                    プロフィール編集
                    <v-icon>
                      mdi-cog-outline
                    </v-icon>
                  </v-btn>
                </v-card-text>
              </v-col>
            </v-row>
            <v-divider class="mt-3" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'loggedIn'
}
</script>
<style lang="scss">
  #profile-name {
    text-align: center;
}
</style>
