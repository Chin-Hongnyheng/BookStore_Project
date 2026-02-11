import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    // Auth routes (no layout)
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/client/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/client/RegisterView.vue'),
    },
    // Client routes (with ClientLayout)
    {
      path: '/',
      component: () => import('@/layouts/ClientLayout.vue'),
      children: [
        {
          path: 'Home',
          name: 'Home',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/HomeView.vue'),
        },
        {
          path: 'Explore',
          name: 'Explore',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/ExploreView.vue'),
        },
        {
          path: 'New-Arrivals',
          name: 'NewArrivals',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/NewArrivalsView.vue'),
        },
        {
          path: 'Best-Selling-Books',
          name: 'BestSellingBooks',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/BestSellingBooksView.vue'),
        },
        {
          path: 'Contact-Us',
          name: 'ContactUs',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/ContactUsView.vue'),
        },
      ],
    },
    // Admin routes (with AdminLayout)
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      redirect: '/admin/dashboard',
      meta: { requiresAuth: true, roles: ['Admin'] },
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
          path: 'coupons',
          name: 'Coupons',
          component: () => import('@/views/admin/CouponView.vue'),
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
