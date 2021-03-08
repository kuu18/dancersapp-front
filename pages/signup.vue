<template>
  <bef-login-form-card>
    <template #form-card-content>
      <ui-toaster />
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-name
          :name.sync="params.user.name"
        />
        <user-form-email
          :email.sync="params.user.email"
        />
        <user-form-password
          :password.sync="params.user.password"
        />
        <v-btn
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="myblue"
          class="white--text"
          @click="signup"
        >
          登録する
        </v-btn>
      </v-form>
    </template>
  </bef-login-form-card>
</template>

<script>
export default {
  name: 'Signup',
  layout: 'beforeLogin',
  data () {
    return {
      isValid: false,
      loading: false,
      params: { user: { name: '', email: '', password: '' } },
      errors: {}
    }
  },
  methods: {
    async signup () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/users', this.params)
          .then(response => this.succeeded(response))
      }
      this.loading = false
    },
    succeeded ({ type, msg, errors }) {
      if (type === 'info') {
        console.log(type, msg, errors)
        this.formReset()
        this.$store.dispatch('getToast', { msg, color: type, timeout: -1 })
      } else if (type === 'error') {
        console.log(type, msg, errors)
        this.errors = errors
        this.$store.dispatch('getToast', { msg: this.errors, color: type })
      }
    },
    formReset () {
      this.$refs.form.reset()
      this.params = { user: { name: '', email: '', password: '' } }
    }
  }
}
</script>
