<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="setDialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">新規イベント</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="event_name"
                    label="イベント名"
                    required
                  />
                </v-col>
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
                        v-model="date"
                        label="イベント日"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="menu = false"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="time"
                    persistent
                    width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="time"
                        label="イベント開始時間"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="modal"
                      v-model="time"
                      full-width
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="modal = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(time)"
                      >
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="content"
                    clearable
                    counter
                    clear-icon="mdi-close-circle"
                    label="イベント概要"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-file-input
                    label="画像を選択"
                    dense
                    prepend-icon="mdi-camera"
                    show-size
                    @change="onUpload"
                    accept="image/png,image/jpeg,image/gif"
                  />
                </v-col>
              </v-row>
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
              @click="post"
            >
              投稿する
            </v-btn>
          </v-card-actions>
          {{ image }}
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
      modal: false,
      event_name: '',
      content: '',
      image: null,
      errors: null
    }
  },
  computed: {
    setDialog: {
      get () { return this.dialog },
      set (val) { return this.$emit('update:dialog', val) }
    }
  },
  methods: {
    onUpload (e) {
      this.image = e
    },
    async post () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('event_name', this.event_name)
      formData.append('event_date', this.date + '-' + this.time)
      formData.append('content', this.content)
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      await this.$axios.$post('/api/v1/eventposts', formData, config)
        .then(response => this.postSuccessful(response))
    },
    postSuccessful ({ msg, type, errors }) {
      if (type === 'success') {
        this.$emit('change-dialog')
        this.$store.dispatch('getToast', { msg, color: type })
        this.$router.go()
      } else if (type === 'error') {
        this.errors = errors
        this.$store.dispatch('getToast', { msg: errors, color: type })
      }
    }
  }
}
</script>
