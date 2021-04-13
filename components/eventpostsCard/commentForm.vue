<template>
  <v-form
    ref="form"
    v-model="isValid"
  >
    <v-card-actions>
      <v-textarea
        v-model="params.comment.content"
        class="mx-2"
        label="コメント"
        rows="1"
        prepend-icon="mdi-comment-outline"
        :rules="rules"
      />
      <v-btn
        :disabled="!isValid || loading"
        :loading="loading"
        text
        color="primary"
        @click="comment"
      >
        投稿する
      </v-btn>
    </v-card-actions>
  </v-form>
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
    const max = 140
    return {
      max,
      rules: [
        v => !!v || '',
        v => (!!v && max >= v.length) || `${max}文字以内で入力してください`
      ],
      isValid: false,
      loading: false,
      params: { comment: { content: '', eventpost_id: this.eventpostId } }
    }
  },
  methods: {
    async comment () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/comments', this.params)
          .then(response => this.commentSuccessful(response))
      }
      this.loading = false
    },
    commentSuccessful ({ msg, type }) {
      this.$store.dispatch('getToast', { msg, color: type })
      if (this.$route.name === 'home') { this.$router.push(`/eventpost/${this.eventpostId}`) } else { this.$router.go() }
    }
  }
}
</script>
