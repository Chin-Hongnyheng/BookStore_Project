import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/admin/dashboard',
    },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/admin/DashboardView.vue'),
        },
        {
          path: 'genres',
          name: 'Genres',
          component: () => import('@/views/admin/GenreView.vue'),
        },
        {
          path: 'books',
          name: 'Books',
          component: () => import('@/views/admin/BookView.vue'),
        },
        {
          path: 'promotions',
          name: 'Promotions',
          component: () => import('@/views/admin/PromotionView.vue'),
        },
        {
          path: 'subscriptions',
          name: 'Subscriptions',
          component: () => import('@/views/admin/SubscriptionView.vue'),
        },
      ],
    },
  ],
})

export default router
