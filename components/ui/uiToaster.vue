<template>
  <v-snackbar
    v-model="setSnackbar"
    top
    text
    :timeout="toast.timeout"
    :color="toast.color"
  >
    {{ toast.msg }}
    <template #action="{ attrs }">
      <v-btn
        v-bind="attrs"
        text
        :color="toast.color"
        @click="resetToast"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      snackbar: true
    }
  },
  computed: {
    toast () {
      return this.$store.state.toast
    },
    setSnackbar: {
      get () {
        return !!this.toast.msg
      },
      set (val) {
        this.resetToast()
        return val
      }
    }
  },
  beforeDestroy () {
    if (!this.toast.color === 'success') { this.resetToast() }
  },
  methods: {
    resetToast () {
      return this.$store.dispatch('getToast', { msg: null, color: 'transparent' })
    }
  }
}
</script>
