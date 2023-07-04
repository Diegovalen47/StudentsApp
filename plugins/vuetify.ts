import { createVuetify, ThemeDefinition  } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const DarkTheme: ThemeDefinition  = {
  dark: true,
  colors: {
    background: '#0A2647',
    surface: '#0A2647',
    primary: '#2C74B3',
    'primary-lighten-1': '#205295',
    'primary-darken-1': '#144272',
    secondary: '#26D07C',
    error: '#DD2C00',
    info: '#26A69A',
    success: '#00E676',
    warning: '#FFC107',

  }
}

const LightTheme: ThemeDefinition  = {
  dark: false,
  colors: {
    background: '#F7FBFC',
    surface: '#F7FBFC',
    primary: '#769FCD',
    'primary-lighten-1': '#D6E6F2',
    'primary-darken-1': '#B9D7EA',
    secondary: '#26D07C',
    error: '#DD2C00',
    info: '#26A69A',
    success: '#00E676',
    warning: '#FFC107',
    
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'LightTheme',
      themes: {
        DarkTheme,
        LightTheme
      }
    },
    ssr: true,
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})
