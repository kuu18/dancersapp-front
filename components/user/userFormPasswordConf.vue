<template>
  <v-text-field
    v-model="setPasswordConf"
    :rules="rules"
    placeholder="パスワード確認"
    :append-icon="toggle.icon"
    :type="toggle.type"
    label="パスワードをもう１度入力"
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
    setPasswordConf: {
      get () { return this.passwordConf },
      set (newval) { return this.$emit('update:passwordConf', newval) }
    },
    toggle () {
      const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show ? 'text' : 'password'
      return { icon, type }
    }
  }
}
</script>
