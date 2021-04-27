<template>
  <search-card>
    <template #search-card-content>
      <v-card
        class="overflow-hidden"
        color="white"
        light
      >
        <v-card-text>
          <v-text-field
            v-model="eventName"
            :loading="loading"
            color="myred"
            label="イベント名"
            @keyup="search"
          />
          <search-form-date
            :event-date-lteq.sync="eventDateLteq"
            :event-date-gteq.sync="eventDateGteq"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="myred"
            dark
            @click="search"
          >
            検索する
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card flat>
        <v-card-title>
          検索結果
        </v-card-title>
        {{ eventDateGteq }}
        <v-divider class="mb-4" />
        <v-card-subtitle v-if="!searchEvents.length">
          検索結果が表示されます
        </v-card-subtitle>
        <v-data-table
          v-else
          :headers="tableHeaders"
          :items="searchEvents"
          item-key="id"
          hide-default-footer
        >
          <template #[`item.eventposts.event_name`]="{ item }">
            <nuxt-link
              :to="`/eventpost/${item.id}`"
              class="text-decoration-none"
            >
              {{ item.event_name }}
            </nuxt-link>
          </template>
          <template #[`item.eventposts.event_date`]="{ item }">
            {{ $my.format(item.event_date) }}
          </template>
        </v-data-table>
        <v-pagination
          v-if="searchEvents.length"
          v-model="page"
          :length="pages"
          circle
          @input="search"
        />
      </v-card>
    </template>
  </search-card>
</template>
<script>
export default {
  name: 'SerachEventposts',
  data () {
    return {
      tableHeaders: [
        {
          text: 'イベント名',
          value: 'eventposts.event_name'
        },
        {
          text: 'イベント日時',
          width: 150,
          value: 'eventposts.event_date'
        }
      ],
      eventName: null,
      eventDateLteq: null,
      eventDateGteq: null,
      loading: false,
      searchEvents: [],
      page: 1,
      pages: null
    }
  },
  methods: {
    async search () {
      this.loading = true
      await this.$axios.$get('/api/v1/eventposts/search', {
        params: {
          page: this.page,
          event_name_cont: this.eventName,
          event_date_gteq: this.eventDateGteq,
          event_date_lteq_end_of_day: this.eventDateLteq
        }
      })
        .then(response => this.searchSuccessful(response))
      this.loading = false
    },
    searchSuccessful (response) {
      this.searchEvents = response.eventposts
      this.pages = response.kaminari.pagenation.pages
    }
  }
}
</script>
