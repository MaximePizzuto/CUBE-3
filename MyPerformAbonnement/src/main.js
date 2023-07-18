import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'  // Notez le changement ici

createApp(App).use(router).mount('#app')
