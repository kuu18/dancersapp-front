<template>
  <v-menu
    v-model="setDateMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="setEventDate"
        label="イベント日"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        :rules="rules"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="setEventDate"
      @click="$emit('change-date-menu')"
    />
  </v-menu>
</template>
<script>
export default {
  props: {
    eventDate: {
      type: String,
      default: ''
    },
    dateMenu: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
    return {
      rules: [
        v => !!v || ''
      ]
    }
  },
  computed: {
    setEventDate: {
      get () { return this.eventDate },
      set (newVal) { return this.$emit('update:event-date', newVal) }
    },
    setDateMenu: {
      get () { return this.dateMenu },
      set (val) { return this.$emit('update:date-menu', val) }
    }
  }
}
</script>
