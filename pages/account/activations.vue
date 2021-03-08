<template>
  <div />
</template>
<script>
export default {
  name: 'AccountActivations',
  layout: 'none',
  async asyncData ({ route }) {
    const token = await route.query.token
    return { token }
  },
  async created () {
    if (this.token) { await this.verifyToken() }
    await this.$router.push('/')
  },
  methods: {
    async verifyToken () {
      const headers = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      await this.$axios.$get('/api/v1/account_activations', headers)
        .then(response => this.validToken(response))
        .catch(error => this.invalidToken(error))
    },
    validToken ({ type, msg, user, exp }) {
      if (type === 'success') {
        this.$auth.login({ exp, user })
        this.$store.dispatch('getToast', { msg, color: type })
        this.$router.push({ path: '/home' })
      }
    },
    invalidToken ({ msg, type }) {
      this.$store.dispatch('getToast', { msg: msg || 'トークンが不正です', color: type || 'error', timeout: -1 })
    }
  }
}
</script>
