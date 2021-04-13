<template>
  <div>
    <v-btn
      v-if="isLiked"
      color="error"
      icon
      @click="unlike"
    >
      <v-icon>
        mdi-heart
      </v-icon>
      {{ count }}
    </v-btn>
    <v-btn
      v-else
      color="gray-liten"
      icon
      @click="like"
    >
      <v-icon>
        mdi-heart-outline
      </v-icon>
      {{ count }}
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
      likeList: []
    }
  },
  computed: {
    count () {
      return this.likeList.length
    },
    isLiked () {
      if (this.likeList.length === 0) { return false }
      return Boolean(this.findLikeId())
    }
  },
  created () {
    this.getLikeByPostId().then((response) => {
      this.likeList = response
    })
  },
  methods: {
    async getLikeByPostId () {
      const res = await this.$axios.$get(`/api/v1/likes/?eventpost_id=${this.eventpostId}`)
      return res
    },
    async like () {
      await this.$axios.$post('/api/v1/likes', { eventpost_id: this.eventpostId })
      this.getLikeByPostId().then((response) => {
        this.likeList = response
      })
    },
    async unlike () {
      await this.$axios.$delete('/api/v1/likes', { data: { eventpost_id: this.eventpostId } })
      this.getLikeByPostId().then((response) => {
        this.likeList = response
      })
    },
    findLikeId () {
      const like = this.likeList.find((like) => {
        return (like.user_id === this.$auth.user.id)
      })
      if (like) { return like.id }
    }
  }
}
</script>
