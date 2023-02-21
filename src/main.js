import { createApp } from 'vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import '@varlet/touch-emulator'

import App from './App.vue'

import AppHeader from './components/AppHeader.vue'

const app = createApp(App)

app.component('AppHeader', AppHeader)
app.use(Varlet).mount('#app')