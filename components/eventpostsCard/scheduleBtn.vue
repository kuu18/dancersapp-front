<template>
  <div>
    <v-btn
      v-if="isScheduled"
      color="orange lighten-2"
      icon
      @click="unscheduled"
    >
      <v-icon>
        mdi-bookmark
      </v-icon>
    </v-btn>
    <v-btn
      v-else
      color="orange lighten-2"
      icon
      @click="scheduling"
    >
      <v-icon>
        mdi-bookmark-plus-outline
      </v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    eventpostId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      scheduleList: []
    }
  },
  computed: {
    isScheduled () {
      if (this.scheduleList.length === 0) { return false }
      return Boolean(this.findScheduledId())
    }
  },
  created () {
    this.getSchedulesByEventpostId().then((response) => {
      this.scheduleList = response
    })
  },
  methods: {
    async getSchedulesByEventpostId () {
      const res = await this.$axios.$get(`/api/v1/schedules/?eventpost_id=${this.eventpostId}`)
      return res
    },
    async scheduling () {
      await this.$axios.$post('/api/v1/schedules', { eventpost_id: this.eventpostId })
      this.getSchedulesByEventpostId().then((response) => {
        this.scheduleList = response
      })
    },
    async unscheduled () {
      await this.$axios.$delete('/api/v1/schedules', { data: { eventpost_id: this.eventpostId } })
      this.getSchedulesByEventpostId().then((response) => {
        this.scheduleList = response
      })
    },
    findScheduledId () {
      const schedule = this.scheduleList.find((schedule) => {
        return (schedule.user_id === this.$auth.user.id)
      })
      if (schedule) { return schedule.id }
    }
  }
}
</script>
