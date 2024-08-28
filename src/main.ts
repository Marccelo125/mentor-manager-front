import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

// Importamos o plugin v-mask
import VMask from '@ssibrahimbas/v-mask'

// Components
const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  icons: {
    defaultSet: 'mdi'
  }
})

const app = createApp(App)

app.use(vuetify).use(router).use(VMask).mount('#app')
