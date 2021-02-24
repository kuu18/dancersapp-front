<template>
  <v-text-field
    v-model="setPasswordConf"
    label="パスワードをもう一度入力"
    placeholder="パスワード確認"
    outlined
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
  computed: {
    setPasswordConf: {
      get () { return this.passwordConf },
      set (newval) { return this.$emit('update:passwordConf', newval) }
    }
  }
}
</script>
