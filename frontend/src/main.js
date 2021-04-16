import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'

export const emitter = mitt();


createApp(App).use(store).use(router).mount('#app')

//export const bus = new VTTCue(); ne marche plus avec vue 3
