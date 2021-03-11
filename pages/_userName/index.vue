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
          cols="9"
        >
          <v-card
            flat
          >
            <v-layout justify-center>
              <v-card-title>
                {{ currentUser.user_name }}
              </v-card-title>
            </v-layout>
            <v-row
              justify="center"
              align-content="center"
              no-gutters
            >
              <v-col
                no-gutters
                cols="3"
              >
                <v-layout justify-center style="padding-bottom: 10px;">
                  <v-avatar
                    size="150"
                  >
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    >
                  </v-avatar>
                </v-layout>
              </v-col>
              <v-col
                no-gutters
              >
                <v-card-actions>
                  <v-btn
                    to="/settings/account"
                  >
                    プロフィールを編集
                    <v-icon>
                      mdi-cog-outline
                    </v-icon>
                  </v-btn>
                </v-card-actions>
                <v-card-subtitle>
                  <h3 class="display-1">
                    {{ currentUser.name }}
                  </h3>
                </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-actions>
                  <v-btn
                    text
                    color="black"
                  >
                    フォロー
                  </v-btn>
                  <v-btn
                    text
                    color="black"
                  >
                    フォロワー
                  </v-btn>
                </v-card-actions>
                <v-card-text>
                  投稿数
                </v-card-text>
              </v-col>
            </v-row>
            <v-divider />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'loggedIn',
  data () {
    return {
      currentUser: this.$store.state.current.user
    }
  }
}
</script>
<style lang="scss">
  #profile-name {
    text-align: center;
}
</style>
