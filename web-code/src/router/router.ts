import { createMemoryHistory, createRouter } from 'vue-router'

import WorkView from '../components/pages/WorkView.vue'
import AboutView from '../components/pages/AboutView.vue'

const routes = [
  { path: '/work', component: WorkView },
  { path: '/about', component: AboutView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})