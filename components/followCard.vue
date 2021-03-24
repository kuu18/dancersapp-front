<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        md="8"
      >
        <v-card>
          <v-toolbar
            color="deep-purple accent-4"
            dark
            flat
          >
            <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>

            <v-spacer />

            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <template #extension>
              <v-tabs>
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
                  <v-card class="mx-auto">
                    <slot name="follow-card-content" />
                  </v-card>
                </v-tabs-items>
              </v-tabs>
            </template>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data ({ $route, $my }) {
    return {
      items: [
        { title: 'userName-following', icon: 'mdi-account-arrow-right-outline' },
        { title: 'userName-followers', icon: 'mdi-account-arrow-left-outline' }
      ],
      pageTitle: this.$my.pageTitle($route.name)
    }
  }
}
</script>
