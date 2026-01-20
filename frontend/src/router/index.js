import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'Home',
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/Explore',
      name: 'Explore',
      component: () => import('@/views/ExploreView.vue')
    },
    {
      path: '/New-Arrivals',
      name: 'NewArrivals',
      component: () => import('@/views/NewArrivalsView.vue')
    },
    {
      path: '/Best-Selling-Books',
      name: 'BestSellingBooks',
      component: () => import('@/views/BestSellingBooksView.vue')
    },
    {
      path: '/Contact-Us',
      name: 'ContactUs',
      component: () => import('@/views/ContactUsView.vue')
    },
  ],
})

export default router
