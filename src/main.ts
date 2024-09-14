import './assets/main.css'
import './assets/vendors/css/fontawesome.min.css'
import './assets/vendors/css/regular.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
