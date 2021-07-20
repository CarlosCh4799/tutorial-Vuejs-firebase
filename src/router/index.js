import { createRouter, createWebHashHistory } from 'vue-router'
import Bonos from '../views/Bonos.vue'
import Empleados from '../views/Empleados.vue'
import FiltroBonos from '../views/FiltroBonos.vue'

const routes = [
  {
    path: '/',
    name: 'Bonos',
    component: Bonos
  },
  {
    path: '/',
    name: 'Empleados',
    component: Empleados
  },
  {
    path: '/',
    name: 'FiltroBonos',
    component: FiltroBonos
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
