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
              <v-toolbar-title>プロフィール編集</v-toolbar-title>

              <v-spacer />
              <v-icon>mdi-account-cog</v-icon>
            </v-app-bar>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
        >
          <ui-toaster />
          <v-col>
            <v-layout justify-end>
              <v-avatar
                size="90"
              >
                <img
                  :src="avatarUrl"
                >
              </v-avatar>
            </v-layout>
          </v-col>
          <v-col>
            <v-card-text>
              <h3>{{ $auth.user.user_name }}</h3>
            </v-card-text>
            <v-btn
              text
              color="primary"
              @click="dialog = !dialog"
            >
              プロフィール写真を変更
            </v-btn>
            <user-avatar-dialog
              :dialog.sync="dialog"
              @change-dialog="changeDialog"
            />
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
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
                名前
              </v-card-text>
              <user-form-name
                :name.sync="params.user.name"
              />
              <v-card-text>
                ユーザーネーム
              </v-card-text>
              <user-form-user-name
                :user-name.sync="params.user.user_name"
              />
              <v-card-text class="px-0">
                <v-btn
                  color="myblue"
                  class="white--text"
                  :disabled="!isValid || loading || !change"
                  :loading="loading"
                  @click="update"
                >
                  変更する
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
      change: false,
      dialog: false,
      avatarUrl: this.$auth.user.avatar_url,
      params: { user: { name: `${$auth.user.name}`, user_name: `${$auth.user.user_name}` } }
    }
  },
  watch: {
    params: {
      handler (val, oldVal) {
        this.change = true
      },
      deep: true
    }
  },
  methods: {
    async update () {
      this.loading = true
      if (this.isValid && this.change) {
        await this.$axios.$patch('/api/v1/users/update_profile', this.params)
          .then(response => this.succeeded(response))
      }
      this.loading = false
    },
    succeeded ({ msg, type }) {
      this.$store.dispatch('getToast', { msg, color: type })
      this.$router.go()
    },
    changeDialog () {
      this.dialog = !(this.dialog)
    }
  }
}
</script>
