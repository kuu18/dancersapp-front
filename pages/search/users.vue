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
            v-model="query.name_cont"
            :loading="loading"
            color="myred"
            label="名前"
            @keyup="search"
          />
          <v-text-field
            v-model="query.user_name_cont"
            :loading="loading"
            color="myred"
            label="ユーザーネーム"
            @keyup="search"
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
        <v-toolbar
          color="white"
          light
          flat
        >
          <v-toolbar-title>検索結果</v-toolbar-title>
        </v-toolbar>
        <v-divider class="mb-4" />
        <v-list>
          <v-subheader v-if="!searchUsers.length">
            検索結果が表示されます
          </v-subheader>

          <v-list-item
            v-for="(user, i) in searchUsers"
            :key="`search-user-${i}`"
            :to="`/${user.user_name}`"
            link
          >
            <v-list-item-avatar>
              <v-img
                :lazy-src="user.avatar_url"
                :src="user.avatar_url"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="user.name" />
            </v-list-item-content>

            <v-list-item-content>
              <v-list-item-title v-text="user.user_name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <infinite-loading
        v-if="searchUsers.length"
        @infinite="infiniteHandler"
      />
    </template>
  </search-card>
</template>
<script>
export default {
  name: 'SerachUsers',
  data () {
    return {
      query: { name_cont: '', user_name_cont: '' },
      loading: false,
      searchUsers: [],
      page: 2
    }
  },
  methods: {
    async search () {
      this.page = 2
      this.loading = true
      await this.$axios.$get('/api/v1/users/search', {
        params: {
          page: 1,
          name_cont: this.query.name_cont,
          user_name_cont: this.query.user_name_cont
        }
      })
        .then(response => this.searchSuccessful(response))
      this.loading = false
    },
    searchSuccessful (response) {
      this.searchUsers = response.users
    },
    async infiniteHandler ($state) {
      await this.$axios.$get('/api/v1/users/search', {
        params: {
          page: this.page,
          name_cont: this.query.name_cont,
          user_name_cont: this.query.user_name_cont
        }
      }).then(response => this.searchPagenation({ response, $state }))
    },
    searchPagenation ({ response, $state }) {
      if (this.page <= response.kaminari.pagenation.pages) {
        this.page += 1
        this.searchUsers.push(...response.users)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  }
}
</script>
