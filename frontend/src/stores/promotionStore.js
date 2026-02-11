import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePromotionStore = defineStore('promotion', () => {
  const promotions = ref([
    {
      id: 1,
      name: 'Summer Sale',
      type: 'Sale',
      discount: 20,
      startDate: '2026-06-01',
      endDate: '2026-08-31',
      books: [1, 2, 4],
      status: 'Active',
      description: 'Summer discount on selected books',
    },
    {
      id: 2,
      name: 'New Year 30% Off',
      type: '% Off',
      discount: 30,
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      books: [1, 3, 5],
      status: 'Active',
      description: 'New Year special promotion',
    },
    {
      id: 3,
      name: 'Best Sellers',
      type: 'Hot Badge',
      discount: 0,
      startDate: '2026-01-20',
      endDate: '2026-12-31',
      books: [2, 3],
      status: 'Active',
      description: 'Mark best-selling books with Hot badge',
    },
    {
      id: 4,
      name: 'Flash Sale',
      type: 'Sale',
      discount: 15,
      startDate: '2026-02-01',
      endDate: '2026-02-07',
      books: [4, 5],
      status: 'Upcoming',
      description: 'Limited time flash sale',
    },
  ])

  const loading = ref(false)
  const error = ref(null)

  // Fetch promotions (currently uses static data as fallback)
  const fetchPromotions = async () => {
    loading.value = true
    error.value = null
    try {
      // Currently static data - replace with API call when backend is ready
      // const response = await fetch('http://localhost:3000/promotions')
      // promotions.value = await response.json()
      console.log('Promotions loaded (using static data)')
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch promotions:', err)
    } finally {
      loading.value = false
    }
  }

  const addPromotion = (promotion) => {
    promotion.id = Math.max(...promotions.value.map((p) => p.id), 0) + 1
    promotion.status = 'Upcoming'
    promotions.value.push(promotion)
  }

  const updatePromotion = (id, updatedPromotion) => {
    const index = promotions.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      promotions.value[index] = { ...promotions.value[index], ...updatedPromotion }
    }
  }

  const deletePromotion = (id) => {
    promotions.value = promotions.value.filter((p) => p.id !== id)
  }

  return {
    promotions,
    loading,
    error,
    fetchPromotions,
    addPromotion,
    updatePromotion,
    deletePromotion,
  }
})
