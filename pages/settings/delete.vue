<template>
  <settings-card>
    <template #settings-card-content>
      <v-container
        fluid
      >
        <v-row>
          <v-col>
            <v-app-bar
              color="red lighten-2"
              dense
              dark
              flat
            >
              <v-toolbar-title>アカウント削除</v-toolbar-title>

              <v-spacer />

              <v-icon>mdi-account-off</v-icon>
            </v-app-bar>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <ui-toaster />
          <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
          >
            <v-card-text>
              <p>アカウントを削除すると、アカウントに紐付く全てのデータが削除されます。</p>
              <p style="font-weight: bold;">
                二度と復旧できませんのでご注意ください。
              </p>
            </v-card-text>
            <v-form
              ref="form"
              v-model="isValid"
            >
              <v-card-text>
                ログイン中のメールアドレス
              </v-card-text>
              <v-card-text>
                <h4>{{ currentUser.email }}</h4>
              </v-card-text>
              <v-card-text>
                パスワードを入力してください
              </v-card-text>
              <user-form-password
                :password.sync="params.user.password"
              />
              <v-card-text class="px-0">
                <v-btn
                  color="red lighten-2"
                  class="white--text"
                  :disabled="!isValid || loading"
                  :loading="loading"
                  @click="destroy"
                >
                  アカウントを削除
                </v-btn>
              </v-card-text>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </settings-card>
</template>
<script>
export default {
  layout: 'loggedIn',
  data ({ $auth }) {
    return {
      isValid: false,
      loading: false,
      currentUser: $auth.user,
      params: { user: { password: '' } }
    }
  },
  methods: {
    async destroy () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$delete('/api/v1/users', { data: this.params })
          .then(response => this.succeeded(response))
      }
      this.loading = false
    },
    succeeded ({ msg, type }) {
      this.$store.dispatch('getToast', { msg, color: type })
      this.$router.replace('/')
    }
  }
}
</script>
