<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="setEventDateGteq"
            label="yyyy/mm/dd"
            prepend-icon="mdi-calendar"
            append-outer-icon="〜"
            readonly
            v-bind="attrs"
            clearable
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="setEventDateGteq"
          @input="menu2 = false"
        />
      </v-menu>
    </v-col>
    <v-col cols="12" sm="6">
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="setEventDateLteq"
            label="yyyy/mm/dd"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            clearable
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="setEventDateLteq"
          @input="menu2 = false"
        />
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    eventDateLteq: {
      type: String,
      default: ''
    },
    eventDateGteq: {
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
      menu: false,
      menu2: false
    }
  },
  computed: {
    setEventDateLteq: {
      get () { return this.eventDateLteq },
      set (newVal) { return this.$emit('update:event-date-lteq', newVal) }
    },
    setEventDateGteq: {
      get () { return this.eventDateGteq },
      set (newVal) { return this.$emit('update:event-date-gteq', newVal) }
    }
  }
}
</script>
