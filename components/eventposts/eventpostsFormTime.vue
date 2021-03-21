<template>
  <v-dialog
    ref="dialog"
    v-model="setTimeDialog"
    :return-value.sync="eventTime"
    persistent
    width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="setEventTime"
        label="イベント開始時間"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
        :rules="rules"
      />
    </template>
    <v-time-picker
      v-if="timeDialog"
      v-model="setEventTime"
      full-width
    >
      <v-spacer />
      <v-btn
        text
        color="primary"
        @click="$emit('change-time-dialog')"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$refs.dialog.save(eventTime)"
      >
        OK
      </v-btn>
    </v-time-picker>
  </v-dialog>
</template>
<script>
export default {
  props: {
    eventTime: {
      type: String,
      default: ''
    },
    timeDialog: {
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
    setEventTime: {
      get () { return this.eventTime },
      set (newVal) { return this.$emit('update:event-time', newVal) }
    },
    setTimeDialog: {
      get () { return this.timeDialog },
      set (val) { return this.$emit('update:time-dialog', val) }
    }
  }
}
</script>
