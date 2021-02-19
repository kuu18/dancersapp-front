<template>
  <v-app>
    <wel-app-bar />
    <v-sheet>
      <v-container
        fluid
        :style="{ maxWidth: '1280px' }"
      >
        <v-row
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >
          <v-col cols="12">
            <div :is="`wel-${menu.title}`" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-app>
</template>

<script>
import welAbout from '~/components/welcome/welAbout'
import welUsage from '~/components/welcome/welUsage'
import WelAppBar from '~/components/welcome/welAppBar'

export default {
  components: {
    welAbout,
    welUsage,
    WelAppBar
  },
  data () {
    return {
      menus: [
        { title: 'about', subtitle: 'このサイトはダンサー向けのアプリケーションです。' },
        { title: 'usage', subtitle: 'このサイトの使い方' }
      ]
    }
  }
}
</script>
