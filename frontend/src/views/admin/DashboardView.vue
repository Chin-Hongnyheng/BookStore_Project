<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900">Dashboard</h2>
      <p class="text-gray-600 mt-1">Welcome to the BookStore Admin Dashboard</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        title="Total Books"
        :value="dashboardStore.dashboardStats.totalBooks"
        subtitle="All books in store"
        icon="book"
        iconColor="text-blue-500"
      />
      <StatCard
        title="Total Genres"
        :value="dashboardStore.dashboardStats.totalGenres"
        subtitle="Available genres"
        icon="tag"
        iconColor="text-purple-500"
      />
      <StatCard
        title="Promotions"
        :value="dashboardStore.dashboardStats.totalPromotions"
        subtitle="Active promotions"
        icon="percent"
        iconColor="text-orange-500"
      />
      <StatCard
        title="Active Subscriptions"
        :value="dashboardStore.dashboardStats.activeSubscriptions"
        subtitle="Active subscribers"
        icon="users"
        iconColor="text-green-500"
      />
      <StatCard
        title="Revenue"
        :value="`$${dashboardStore.dashboardStats.subscriptionRevenue}`"
        subtitle="Monthly revenue"
        icon="gift"
        iconColor="text-red-500"
      />
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sales Bar Chart -->
      <div class="lg:col-span-2">
        <Chart
          type="bar"
          title="Monthly Sales"
          :data="
            dashboardStore.salesData.monthly.map((item) => ({
              label: item.month,
              value: item.sales,
            }))
          "
        />
      </div>

      <!-- Genre Distribution Pie Chart -->
      <Chart
        type="pie"
        title="Genre Distribution"
        :data="dashboardStore.salesData.genreDistribution"
      />
    </div>

    <!-- Revenue Line Chart -->
    <Chart
      type="line"
      title="Monthly Revenue"
      :data="
        dashboardStore.salesData.monthly.map((item) => ({
          label: item.month,
          value: item.revenue,
        }))
      "
    />

    <!-- Top Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activities -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div class="space-y-3">
          <div
            v-for="activity in dashboardStore.recentActivities"
            :key="activity.id"
            class="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-0"
          >
            <div class="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
            <div class="flex-1">
              <p class="text-sm text-gray-900">{{ activity.message }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.timestamp }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Selling Books -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Selling Books</h3>
        <div class="space-y-3">
          <div
            v-for="(book, index) in dashboardStore.salesData.topBooks"
            :key="index"
            class="flex items-center justify-between pb-3 border-b border-gray-200 last:border-0"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ book.title }}</p>
              <p class="text-xs text-gray-500">{{ book.sales }} sales</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-900">${{ book.revenue.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useGenreStore } from '@/stores/genreStore'
import { useBookStore } from '@/stores/bookStore'
import { usePromotionStore } from '@/stores/promotionStore'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import StatCard from '@/components/StatCard.vue'
import Chart from '@/components/Chart.vue'

const route = useRoute()
const dashboardStore = useDashboardStore()
const genreStore = useGenreStore()
const bookStore = useBookStore()
const promotionStore = usePromotionStore()
const subscriptionStore = useSubscriptionStore()

// Fetch all data when dashboard mounts
onMounted(async () => {
  await Promise.all([
    genreStore.fetchGenres(),
    bookStore.fetchBooks(),
    promotionStore.fetchPromotions(),
    subscriptionStore.fetchSubscriptions(),
  ])
})

// Reload data when navigating back to dashboard
watch(
  () => route.path,
  async () => {
    if (route.path === '/admin/dashboard') {
      await Promise.all([
        genreStore.fetchGenres(),
        bookStore.fetchBooks(),
        promotionStore.fetchPromotions(),
        subscriptionStore.fetchSubscriptions(),
      ])
    }
  },
)
</script>
