<template>
  <v-app>
    <welcome-app-bar
      :menus="menus"
      :img-height="imgHeight"
    />
    <ui-toaster />
    <v-img
      id="scroll-top"
      dark
      :src="image_src"
      gradient="to top right, rgba(211,211,211,.6), rgba(119,136,153,.9)"
      :height="imgHeight"
      max-width="1920"
      max-height="1080"
    >
      <v-row
        align="center"
        justify="center"
        :style="{ height: `${imgHeight}px` }"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <h1 class="display-1 mb-4">
            さあ、繋がろうDanceで。
          </h1>
          <h4
            class="subheading"
            :style="{ letterSpacing: '5px' }"
          >
            Danceを中心としたSNSツール
          </h4>
        </v-col>
      </v-row>
    </v-img>
    <v-sheet>
      <v-container
        fluid
        :style="{ maxWidth: '1280px' }"
      >
        <v-row
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >
          <v-col
            :id="menu.title"
            cols="12"
          >
            <v-card flat>
              <v-card-title class="justify-center display-1">
                {{ $t(`menus.${menu.title}`) }}
              </v-card-title>
              <v-card-text class="text-center">
                {{ menu.subtitle }}
              </v-card-text>
            </v-card>
          </v-col>
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
export default {
  name: 'Welcome',
  components: {
    welAbout,
    welUsage
  },
  data () {
    return {
      imgHeight: 750,
      image_src: require('../assets/images/welcome-img.jpg'),
      menus: [
        { title: 'about', subtitle: 'このサイトはダンサー向けのアプリケーションです。' },
        { title: 'usage', subtitle: 'このサイトの使い方' }
      ]
    }
  }
}
</script>
