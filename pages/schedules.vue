<template>
  <div id="logged-in-home">
    <v-parallax>
      <v-img
        :src="homeImg"
        alt="homeImg"
        :aspect-ratio="16/9"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        <v-container
          fill-height
        >
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              :sm="container.sm"
              :md="container.md"
            >
              <v-card-title class="white--text">
                直近のイベント
              </v-card-title>

              <v-divider dark />

              <v-row
                align="center"
              >
                <v-col
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="1000"
                  >
                    <template #activator="{ on }">
                      <v-btn
                        block
                        :height="card.height"
                        :elevation="card.elevation"
                        v-on="on"
                      >
                        <div>
                          <v-icon
                            size="24"
                            color="myblue"
                            class="my-2"
                          >
                            mdi-plus
                          </v-icon>
                          <div class="caption myblue--text">
                            新しいイベントを投稿
                          </div>
                        </div>
                      </v-btn>
                    </template>
                    <eventposts-dialog-card
                      @change-dialog="changeDialog"
                    />
                  </v-dialog>
                </v-col>
                <v-col
                  v-for="(event, i) in recentSchedules.slice(0, 2)"
                  :key="`card-schedule-${i}`"
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-card
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    :to="`/eventpost/${event.eventpost.id}`"
                    class="v-btn text-capitalize"
                  >
                    <v-card-title class="pb-1 d-block text-truncate">
                      {{ event.eventpost.event_name }}
                    </v-card-title>
                    <v-card-text class="caption">
                      <v-icon size="14">
                        mdi-update
                      </v-icon>
                      {{ $my.format(event.eventpost.event_date) }}~
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-parallax>
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title>
            全てのスケジュールされたイベント
          </v-card-title>

          <v-divider class="mb-4" />
          <v-data-table
            :headers="tableHeaders"
            :items="recentSchedules"
            item-key="id"
          >
            <template #[`item.eventpost.event_name`]="{ item }">
              <nuxt-link
                :to="`/eventpost/${item.eventpost.id}`"
                class="text-decoration-none"
              >
                {{ item.eventpost.event_name }}
              </nuxt-link>
            </template>
            <template #[`item.eventpost.event_date`]="{ item }">
              {{ $my.format(item.eventpost.event_date) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import homeImg from '~/assets/images/event-img.jpg'

export default {
  layout: 'default',
  middleware: 'getSchedules',
  data () {
    return {
      homeImg,
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 120,
        elevation: 4
      },
      tableHeaders: [
        {
          text: 'イベント名',
          value: 'eventpost.event_name'
        },
        {
          text: 'イベント日時',
          width: 150,
          value: 'eventpost.event_date'
        }
      ],
      dialog: false
    }
  },
  computed: {
    recentSchedules () {
      const copySchedules = Array.from(this.$store.state.schedules)
      return copySchedules.sort((a, b) => {
        if (a.eventpost.event_date < b.eventpost.event_date) { return -1 }
        if (a.eventpost.event_date > b.eventpost.event_date) { return 1 }
        return 0
      })
    }
  },
  methods: {
    changeDialog () {
      this.dialog = !(this.dialog)
    }
  }
}
</script>

<!-- css 追加 -->
<style lang="scss">
#logged-in-home {
  .v-parallax__content {
    padding: 0;
  }
}
</style>
