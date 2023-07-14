
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
    '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL
    },
    private: {
      serverBaseURL: process.env.SERVER_BASE_URL
    }
  },
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/axios',
  ],
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
  },
})
