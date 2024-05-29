import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/home.vue'

const routes = [
    { path: '/', component: HomeView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})


export default router