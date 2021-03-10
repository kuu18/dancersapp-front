<template>
  <default-form-card>
    <template #form-card-content>
      <ui-toaster />
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-password
          :password.sync="params.user.password"
        />
        <user-form-password-conf
          :password-conf.sync="params.user.password_confirmation"
        />
        <v-card-text class="px-0">
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="myblue"
            class="white--text"
            @click="submit"
          >
            登録する
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </default-form-card>
</template>

<script>
export default {
  name: 'AccountPasswordReset',
  layout: 'beforeLogin',
  async asyncData ({ route }) {
    const token = await route.query.token
    return { token }
  },
  data ({ route }) {
    return {
      isValid: false,
      loading: false,
      params: { user: { password: '', password_confirmation: '' } }
    }
  },
  async created () {
    if (!this.token) {
      this.$store.dispatch('getToast', { msg: '無効なURLです', color: 'error', timeout: -1 })
      await this.$router.push('/')
    }
  },
  methods: {
    async submit () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$patch('/api/v1/password_resets', this.params,
          { headers: { Authorization: `Bearer ${this.token}` } })
          .then(response => this.succeeded(response))
      }
      this.loading = false
    },
    succeeded ({ type, msg, user, exp }) {
      if (type === 'success') {
        this.$auth.login({ exp, user })
        this.$router.replace({ path: '/home' })
        this.$store.dispatch('getToast', { msg, color: type })
      } else if (type === 'error') {
        this.$router.replace({ path: '/' })
        this.$store.dispatch('getToast', { msg, color: type })
      }
    }
  }
}
</script>
