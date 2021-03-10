<template>
  <bef-login-form-card>
    <template #form-card-content>
      <ui-toaster />
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-email
          :email.sync="params.auth.email"
          no-validation
        />
        <user-form-password
          :password.sync="params.auth.password"
          no-validation
        />
        <v-card-actions>
          <nuxt-link
            to="/password/resets"
            class="body-2 text-decoration-none"
          >
            パスワードを忘れた?
          </nuxt-link>
        </v-card-actions>
        <v-card-text class="px-0">
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="myblue"
            class="white--text"
            @click="login"
          >
            ログインする
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </bef-login-form-card>
</template>

<script>
export default {
  name: 'Login',
  layout: 'beforeLogin',
  data () {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: '', password: '' } }
    }
  },
  methods: {
    async login () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/login', this.params)
          .then(response => this.authSuccessful(response))
          .catch(error => this.authFailure(error))
      }
      this.loading = false
    },
    async authSuccessful (response) {
      await this.$auth.login(response)
      this.$router.push(this.$store.state.rememberRoute)
    },
    authFailure ({ response }) {
      return (response.status === 404)
        ? this.$store.dispatch('getToast', { msg: 'ユーザーが見つかりません。パスワードとメールアドレスを確認してください' })
        : this.$my.errorHandler(response)
    }
  }
}
</script>
