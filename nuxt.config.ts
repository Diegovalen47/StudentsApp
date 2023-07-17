export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/globals.scss" as *;',
        },
      },
    },
  },
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      // If number is changed, change the comment too.
      accessTokenTimeoutInSeconds: 60 * 5, // 5 minutes
      refreshTokenTimeoutInSeconds: 60 * 60, // 1 hour
    },
    private: {
      serverBaseURL: process.env.SERVER_BASE_URL,
    },
  },
  css: [
    '@/assets/css/fonts.scss',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
})
