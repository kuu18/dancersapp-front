<template>
  <v-textarea
    v-model="setEventContent"
    clearable
    counter
    clear-icon="mdi-close-circle"
    label="イベント概要"
    :rules="rules"
  />
</template>
<script>
export default {
  props: {
    eventContent: {
      type: String,
      default: ''
    }
  },
  data () {
    const max = 140
    return {
      max,
      rules: [
        v => !!v || '',
        v => (!!v && max >= v.length) || `${max}文字以内で入力してください`
      ]
    }
  },
  computed: {
    setEventContent: {
      get () { return this.evnetContent },
      set (newVal) { return this.$emit('update:event-content', newVal) }
    }
  }
}
</script>
