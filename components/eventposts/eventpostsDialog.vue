<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="setDialog"
        persistent
        max-width="1000"
      >
        <v-card>
          <v-card-title>
            <span class="headline">新規イベント</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form
                ref="form"
                v-model="isValid"
              >
                <v-row>
                  <v-col cols="12">
                    <eventposts-form-name
                      :event-name.sync="event_name"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <eventposts-form-date
                      :event-date.sync="date"
                      :date-menu.sync="menu"
                      @change-date-menu="changeDateMenu"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <eventposts-form-time
                      :event-time.sync="time"
                      :time-dialog.sync="timeDialog"
                      @change-time-dialog="changeTimeDialog"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <eventposts-form-content
                      :event-content.sync="content"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <eventposts-form-image
                      @resized="uploadImage"
                    />
                  </v-col>
                  <v-col>
                    <v-img :src="image" :height="canvas.height" :width="canvas.width" />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="$emit('change-dialog')"
            >
              閉じる
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :disabled="!isValid || loading"
              :loading="loading"
              @click="submit"
            >
              投稿する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      time: null,
      timeDialog: false,
      event_name: '',
      content: '',
      errors: null,
      isValid: false,
      loading: false,
      blob: null,
      image: null,
      canvas: ''
    }
  },
  computed: {
    setDialog: {
      get () { return this.dialog },
      set (val) { return this.$emit('update:dialog', val) }
    }
  },
  methods: {
    uploadImage ({ url, blob, canvas }) {
      this.image = url
      this.blob = blob
      this.canvas = canvas
    },
    changeDateMenu () {
      this.menu = !(this.menu)
    },
    changeTimeDialog () {
      this.timeDialog = !(this.timeDialog)
    },
    async submit () {
      const formData = new FormData()
      formData.append('image', this.blob)
      formData.append('event_name', this.event_name)
      formData.append('event_date', this.date + '-' + this.time)
      formData.append('content', this.content)
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/eventposts', formData, config)
          .then(response => this.postSuccessful(response))
      }
      this.loading = false
    },
    postSuccessful ({ msg, type, errors }) {
      if (type === 'success') {
        this.$emit('change-dialog')
        this.$store.dispatch('getToast', { msg, color: type })
        this.$router.go('/home')
      } else if (type === 'error') {
        this.errors = errors
        this.$store.dispatch('getToast', { msg: errors, color: type })
      }
    }
  }
}
</script>
