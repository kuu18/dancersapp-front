<template>
  <v-text-field
    v-model="setUserName"
    :rules="form.rules"
    counter="50"
    :hint="form.hint"
    label="ユーザーネームを入力"
    :placeholder="form.placeholder"
    outlined
  />
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      default: ''
    }
  },
  computed: {
    setUserName: {
      get () { return this.userName },
      set (newVal) { return this.$emit('update:user-name', newVal) }
    },
    form () {
      const min = '7文字以上'
      const msg = `${min}。半角英数字•ﾋﾟﾘｵﾄﾞ•ｱﾝﾀﾞｰﾊﾞｰが使えます`
      const required = v => !!v || ''
      const format = v => /^[\w.]{7,50}$/.test(v) || msg
      const rules = [format, required]
      const hint = msg
      const placeholder = min
      return { rules, hint, placeholder }
    }
  }
}
</script>
