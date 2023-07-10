
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
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL
    },
    private: {
      serverBaseURL: process.env.SERVER_BASE_URL
    }
  },
  auth: {
    baseURL: '/api/auth',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/student', method: 'get' }
      },
      pages: {
        login: '/login'
      },
      token: {
        signInResponseTokenPointer: '/token/accessToken',
        maxAgeInSeconds: 60*5 // 5 minutes
      },
    },
    session: {
      enableRefreshPeriodically: false,
      enableRefreshOnWindowFocus: false,
    },
    // @ts-expect-error
    origin: process.env.AUTH_ORIGIN,
    globalAppMiddleware: true
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
