<template>
  <v-text-field
    v-model="setEventName"
    :rules="rules"
    label="イベント名"
    required
  />
</template>
<script>
export default {
  props: {
    eventName: {
      type: String,
      default: ''
    }
  },
  data () {
    const max = 50
    return {
      max,
      rules: [
        v => !!v || '',
        v => (!!v && max >= v.length) || `${max}文字以内で入力してください`
      ]
    }
  },
  computed: {
    setEventName: {
      get () { return this.evnetName },
      set (newVal) { return this.$emit('update:event-name', newVal) }
    }
  }
}
</script>
