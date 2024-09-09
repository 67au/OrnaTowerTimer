import { createApp } from 'vue'
import '@varlet/touch-emulator'

import router from '@/router'
import { i18n } from '@/i18n'
import App from './App.vue'
import 'virtual:uno.css'


const app = createApp(App)

app.use(router).use(i18n).mount('#app')
