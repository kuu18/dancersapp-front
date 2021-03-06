export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'dancersapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/sass/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/auth',
    'plugins/axios',
    'plugins/localStorage',
    'plugins/myInject',
    'plugins/nuxtClientInit',
    'plugins/infiniteloading'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n'
  ],

  publicRuntimeConfig: {
    appName: process.env.APP_NAME,
    cryptoKey: process.env.CRYPTO_KEY
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    baseURL: process.env.NODE_ENV === 'production' ? 'https://back.dancersapp.site' : 'http://localhost:3000'
  },

  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/sass/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: 'ACCBE1',
          info: '4FC1E9',
          success: '44D69E',
          warning: 'FEB65E',
          error: 'F9B9B7',
          background: 'F5F5F5',
          myred: 'A13D63',
          myblue: 'ACCBE1'
        }
      }
    }
  },

  i18n: {
    strategy: 'no_prefix',
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    vueI18n: {
      fallbackLocale: 'ja',
      // silentTranslationWarn: true,
      silentFallbackWarn: true,
      messages: {
        ja: require('./locales/ja.json'),
        en: require('./locales/en.json')
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
