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
              <v-toolbar-title>メールアドレス変更</v-toolbar-title>
              <v-spacer />
              <v-icon>mdi-email</v-icon>
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
                メールアドレス
              </v-card-text>
              <user-form-email
                :email.sync="params.user.email"
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
      currentUser: $auth.user,
      params: { user: { email: `${$auth.user.email}` } }
    }
  },
  watch: {
    params: {
      handler (val, oldVal) {
        this.changeForm(val)
      },
      deep: true
    }
  },
  methods: {
    changeForm (val) {
      if (!(this.currentUser.email === val.user.email)) { this.change = true } else if (this.currentUser.email === val.user.email) { this.change = false }
    },
    async update () {
      this.loading = true
      if (this.isValid && this.change) {
        await this.$axios.$patch('/api/v1/users/chenge_email', this.params)
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
