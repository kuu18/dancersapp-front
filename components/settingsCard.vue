<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          height="700"
          flat
        >
          <v-tabs vertical class="hidden-mobile-and-down">
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
            <v-tabs-items
              vertical
            >
              <v-card flat>
                <slot name="settings-card-content" />
              </v-card>
            </v-tabs-items>
          </v-tabs>
          <v-tabs
            show-arrows
            class="hidden-mobile-and-up"
          >
            <v-tabs-slider />

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
              <v-card flat>
                <slot name="settings-card-content" />
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
  layout: 'loggedIn',
  data ({ $route }) {
    return {
      items: [
        { title: 'settings-account', icon: 'mdi-account-cog' },
        { title: 'settings-email', icon: 'mdi-email' },
        { title: 'settings-password', icon: 'mdi-lock' },
        { title: 'settings-delete', icon: 'mdi-account-off' }
      ],
      right: null
    }
  }
}
</script>
