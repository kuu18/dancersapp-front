<template>
  <v-text-field
    v-model="setPassword"
    :rules="rules"
    counter
    label="パスワード確認"
    placeholder="パスワードをもう一度入力"
    :append-icon="toggle.icon"
    :type="toggle.type"
    outlined
    autocomplete="on"
    @click:append="show = !show"
  />
</template>

<script>
export default {
  props: {
    passwordConf: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      rules: [
        v => !!v || ''
      ]
    }
  },
  computed: {
    setPassword: {
      get () { return this.password },
      set (newVal) { return this.$emit('update:passwordConf', newVal) }
    },
    toggle () {
      const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show ? 'text' : 'password'
      return { icon, type }
    }
  }
}
</script>
