import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Reporte from '@/components/Reporte.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/reportes/:periodo', name: 'Reporte', component: Reporte }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
