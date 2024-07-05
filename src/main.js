import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axiosPlugin from '@/plugins/axiosPlugin.js'
import ValidationError from '@/components/ValidationError.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axiosPlugin)
app.component('ValidationError', ValidationError)
app.mount('#app')
app.component('IconSpinner', IconSpinner)
