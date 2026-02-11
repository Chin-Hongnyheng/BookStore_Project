<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b-1 border-gray-200">
      <div class="flex items-center justify-between px-6 py-5">
        <div class="flex items-center gap-3">
          <font-awesome-icon icon="book" class="text-4xl text-blue-600" />
          <h1 class="text-2xl font-bold text-gray-900">Boundora BookStore</h1>
        </div>
        <div class="flex items-center gap-4">
          <button class="relative text-gray-600 hover:text-gray-900 transition-colors">
            <font-awesome-icon icon="bell" class="text-xl" />
            <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div class="flex items-center gap-2 pl-4 border-l border-gray-200">
            <font-awesome-icon icon="user" class="text-lg text-gray-600" />
            <span class="text-sm text-gray-700">Admin User</span>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-65px)]">
        <nav class="p-4 space-y-2">
          <router-link
            to="/admin/dashboard"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors"
            :class="
              $route.path === '/admin/dashboard'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
          >
            <font-awesome-icon icon="dashboard" />
            Dashboard
          </router-link>

          <router-link
            to="/admin/genres"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors"
            :class="
              $route.path === '/admin/genres'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
          >
            <font-awesome-icon icon="tag" />
            Genres
          </router-link>

          <router-link
            to="/admin/books"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors"
            :class="
              $route.path === '/admin/books'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
          >
            <font-awesome-icon icon="book" />
            Books
          </router-link>

          <router-link
            to="/admin/promotions"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors"
            :class="
              $route.path === '/admin/promotions'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
          >
            <font-awesome-icon icon="percent" />
            Promotions
          </router-link>

          <router-link
            to="/admin/coupons"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors"
            :class="
              $route.path === '/admin/coupons'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
          >
            <font-awesome-icon icon="ticket-alt" />
            Coupons
          </router-link>

          <router-link
            to="/admin/subscriptions"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors"
            :class="
              $route.path === '/admin/subscriptions'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
          >
            <font-awesome-icon icon="users" />
            Subscriptions
          </router-link>
        </nav>

        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <router-link
            to="/Login"
            class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            <font-awesome-icon icon="sign-out-alt" />
            Logout
          </router-link>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <div class="p-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
aside {
  position: relative;
}

aside > div:last-child {
  position: sticky;
  bottom: 0;
}
</style>
