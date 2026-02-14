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
          path: '/books/:id',
          name: 'Book',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/SingleBookView.vue'),
        },
        {
          path: 'Explore',
          name: 'Explore',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/ExploreView.vue'),
        },
        {
          path: 'wishlist',
          name: 'wishlist',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/WishlistView.vue'),
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
          path: 'About-Us',
          name: 'AboutUs',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/AboutUsView.vue'),
        },
        {
          path: 'Cart',
          name: 'Cart',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/CartView.vue'),
        },
        {
          path: 'Checkout',
          name: 'Checkout',
          meta: { requiresAuth: true, roles: ['User'] },
          component: () => import('@/views/client/CheckoutView.vue'),
        },
        {
          path: '/:name/:id',
          name: 'Genre',
          component: () => import('@/views/client/GenreView.vue'),
        },
      ],
    },
    // Admin routes (with AdminLayout)
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      redirect: '/admin/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { requiresAuth: true, roles: ['admin'] },
          component: () => import('@/views/admin/DashboardView.vue'),
        },
        {
          path: 'genres',
          name: 'Genres',
          meta: { requiresAuth: true, roles: ['Admin'] },
          component: () => import('@/views/admin/GenreView.vue'),
        },
        {
          path: 'books',
          name: 'Books',
          meta: { requiresAuth: true, roles: ['Admin'] },
          component: () => import('@/views/admin/BookView.vue'),
        },
        {
          path: 'promotions',
          name: 'Promotions',
          meta: { requiresAuth: true, roles: ['Admin'] },
          component: () => import('@/views/admin/PromotionView.vue'),
        },
        {
          path: 'coupons',
          name: 'Coupons',
          meta: { requiresAuth: true, roles: ['Admin'] },
          component: () => import('@/views/admin/CouponView.vue'),
        },
        {
          path: 'subscriptions',
          name: 'Subscriptions',
          meta: { requiresAuth: true, roles: ['Admin'] },
          component: () => import('@/views/admin/SubscriptionView.vue'),
        },
        {
          path: 'orders',
          name: 'Orders',
          meta: { requiresAuth: true, roles: ['Admin'] },
          component: () => import('@/views/admin/OrdersView.vue'),
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
