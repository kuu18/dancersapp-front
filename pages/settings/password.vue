<template>
  <settings-card>
    <template #settings-card-content>
      <v-container
        fluid
      >
        <v-row>
          <v-col>
            <v-app-bar
              color="myblue"
              dense
              dark
              flat
            >
              <v-toolbar-title>パスワード変更</v-toolbar-title>
              <v-spacer />
              <v-icon>mdi-lock</v-icon>
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
            <v-form
              ref="form"
              v-model="isValid"
            >
              <v-card-text>
                現在のパスワード
              </v-card-text>
              <user-form-password
                :password.sync="params.user.old_password"
              />
              <v-card-text>
                新しいパスワード
              </v-card-text>
              <user-form-password
                :password.sync="params.user.password"
              />
              <v-card-text class="px-0">
                <v-btn
                  color="myblue"
                  class="white--text"
                  :disabled="!isValid || loading"
                  :loading="loading"
                  @click="update"
                >
                  変更する
                </v-btn>
                <nuxt-link
                  to="/password/resets"
                  class="body-2 text-decoration-none float-right"
                  @click="rememberRoute"
                >
                  パスワードを忘れた?
                </nuxt-link>
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
  name: 'SettingsPassword',
  layout: 'loggedIn',
  data ({ $auth }) {
    return {
      isValid: false,
      loading: false,
      currentUser: $auth.user,
      params: { user: { password: '', old_password: '' } }
    }
  },
  methods: {
    async update () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$patch('/api/v1/users/change_password', this.params)
          .then(response => this.succeeded(response))
      }
      this.loading = false
    },
    succeeded ({ msg, type }) {
      this.$store.dispatch('getToast', { msg, color: type })
    }
  }
}
</script>
