
export default defineNuxtConfig({
  devtools: { 
    enabled: true 
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/colors.scss" as *;'
        }
      }
    }
  },
  modules: [
    '@pinia/nuxt',
    '@sidebase/nuxt-auth'
  ],
  auth: {
    // @ts-expect-error type is different
    origin: process.env.AUTH_ORIGIN,
    basePath: '/api/auth',
  },
  css: [
    '@/assets/css/global.scss',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
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
  }
})
