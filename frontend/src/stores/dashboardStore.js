import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useBookStore } from './bookStore'
import { useGenreStore } from './genreStore'
import { usePromotionStore } from './promotionStore'
import { useSubscriptionStore } from './subscriptionStore'

export const useDashboardStore = defineStore('dashboard', () => {
  const bookStore = useBookStore()
  const genreStore = useGenreStore()
  const promotionStore = usePromotionStore()
  const subscriptionStore = useSubscriptionStore()

  const dashboardStats = computed(() => ({
    totalBooks: bookStore.books.length,
    totalGenres: genreStore.genres.length,
    totalPromotions: promotionStore.promotions.length,
    activeSubscriptions: subscriptionStore.getActiveCount(),
    subscriptionRevenue: subscriptionStore.getTotalRevenue(),
  }))

  const recentActivities = ref([
    {
      id: 1,
      type: 'book_added',
      message: 'New book added: "The Great Gatsby"',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'promotion_created',
      message: 'Promotion created: "Summer Sale"',
      timestamp: '5 hours ago',
    },
    {
      id: 3,
      type: 'subscription_new',
      message: 'New premium subscription from John Doe',
      timestamp: '1 day ago',
    },
    { id: 4, type: 'book_updated', message: 'Book updated: "1984"', timestamp: '2 days ago' },
    { id: 5, type: 'genre_added', message: 'New genre added: "Horror"', timestamp: '3 days ago' },
  ])

  const salesData = ref({
    monthly: [
      { month: 'Jan', sales: 2400, revenue: 2400 },
      { month: 'Feb', sales: 1398, revenue: 2210 },
      { month: 'Mar', sales: 9800, revenue: 2290 },
      { month: 'Apr', sales: 3908, revenue: 2000 },
      { month: 'May', sales: 4800, revenue: 2181 },
      { month: 'Jun', sales: 3800, revenue: 2500 },
    ],
    topBooks: [
      { title: 'To Kill a Mockingbird', sales: 523, revenue: 7848.77 },
      { title: 'Sapiens', sales: 428, revenue: 8121.72 },
      { title: 'The Great Gatsby', sales: 245, revenue: 3182.55 },
      { title: '1984', sales: 312, revenue: 4365.88 },
      { title: 'The Silent Patient', sales: 189, revenue: 3219.11 },
    ],
    genreDistribution: [
      { name: 'Fiction', value: 35 },
      { name: 'Non-Fiction', value: 25 },
      { name: 'Mystery', value: 20 },
      { name: 'Science Fiction', value: 15 },
      { name: 'Romance', value: 5 },
    ],
  })

  return {
    dashboardStats,
    recentActivities,
    salesData,
  }
})
