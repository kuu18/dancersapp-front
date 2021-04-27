<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        sm="10"
        md="8"
      >
        <v-card flat>
          <v-toolbar
            color="myred"
            dark
            flat
          >
            <v-toolbar-title class="font-weight-light">
              {{ pageTitle }}
            </v-toolbar-title>

            <v-spacer />

            <v-icon>mdi-magnify</v-icon>
          </v-toolbar>
          <v-tabs color="myred" show-arrows>
            <v-tab
              v-for="(item, i) in items"
              :key="`item-tab-${i}`"
              nuxt
              :to="{name: item.title}"
            >
              <v-icon left>
                {{ item.icon }}
              </v-icon>
              {{ $my.pageTitle(item.title) }}
            </v-tab>

            <v-tabs-items>
              <v-card>
                <slot name="search-card-content" />
              </v-card>
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data ({ $route }) {
    return {
      items: [
        { title: 'search-users', icon: 'mdi-account-search-outline' },
        { title: 'search-eventposts', icon: 'mdi-calendar-search' }
      ],
      pageTitle: this.$my.pageTitle($route.name)
    }
  }
}
</script>
