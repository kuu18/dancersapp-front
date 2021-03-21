<template>
  <v-snackbar
    v-model="setSnackbar"
    top
    text
    :timeout="toast.timeout"
    :color="toast.color"
  >
    <div
      v-for="(msg, i) in arrayMsg"
      :key="`msg-${i}`"
    >
      <ul>
        <li>{{ msg }}</li>
      </ul>
    </div>
    <div v-if="!(Array.isArray(toast.msg))">
      {{ toast.msg }}
    </div>
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
    },
    arrayMsg () {
      if (Array.isArray(this.toast.msg)) { return this.toast.msg } else { return null }
    }
  },
  beforeDestroy () {
    if (this.toast.color === 'info') { this.resetToast() }
  },
  methods: {
    resetToast () {
      return this.$store.dispatch('getToast', { msg: null, color: 'transparent' })
    }
  }
}
</script>
