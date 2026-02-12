import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('@/views/WishlistView.vue'),
    },
    {
      path: '/Home',
      name: 'Home',
      meta: { requiresAuth: true, roles: ['User'] },
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/books/:id',
      name: 'Book',
      component: () => import('@/views/BookView.vue'),
    },
    {
      path: '/:name/:id',
      name: 'Genre',
      component: () => import('@/views/GenreView.vue'),
    },
    {
      path: '/Explore',
      name: 'Explore',
      meta: { requiresAuth: true, roles: ['User'] },
      component: () => import('@/views/ExploreView.vue'),
    },
    {
      path: '/New-Arrivals',
      name: 'NewArrivals',
      meta: { requiresAuth: true, roles: ['User'] },
      component: () => import('@/views/NewArrivalsView.vue'),
    },
    {
      path: '/Best-Selling-Books',
      name: 'BestSellingBooks',
      meta: { requiresAuth: true, roles: ['User'] },
      component: () => import('@/views/BestSellingBooksView.vue'),
    },
    {
      path: '/Contact-Us',
      name: 'ContactUs',
      meta: { requiresAuth: true, roles: ['User'] },
      component: () => import('@/views/ContactUsView.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const roles: string[] = JSON.parse(sessionStorage.getItem('roles') || '[]')
  const normalizedRoles = roles.map((r) => r.toLowerCase())

  if (to.meta.requiresAuth) {
    if (!token) return next('/login')

    if (to.meta.roles) {
      const allowedRoles = (to.meta.roles as string[]).map((r) => r.toLowerCase())
      const hasAccess = normalizedRoles.some((r) => allowedRoles.includes(r))
      if (!hasAccess) return next('/login')
    }
  }
  next()
})
export default router
