import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Restaurant from './pages/Restaurant.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/restaurant', component: Restaurant },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const VueApp = createApp(App)
VueApp.use(router)

VueApp.mount('#app')

