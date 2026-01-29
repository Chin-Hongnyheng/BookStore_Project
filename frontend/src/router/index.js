import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'Dashboard',
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/Book',
      name: 'Book',
      component: () => import('@/views/BookView.vue'),
    },
  ],
})

export default router
