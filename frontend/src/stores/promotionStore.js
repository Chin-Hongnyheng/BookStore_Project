import { defineStore } from 'pinia'
import { ref } from 'vue'
import { promotionApi } from '@/services/promotionApi'

export const usePromotionStore = defineStore('promotion', () => {
  const promotions = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch promotions from backend
  const fetchPromotions = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await promotionApi.getAllPromotions()
      // Transform data to include books array (product IDs)
      promotions.value = data.map((promo) => ({
        ...promo,
        books: promo.products ? promo.products.map((p) => p.id) : [],
      }))
      console.log('Promotions loaded:', promotions.value.length, 'items')
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch promotions:', err)
    } finally {
      loading.value = false
    }
  }

  const addPromotion = async (promotionData) => {
    loading.value = true
    error.value = null
    try {
      // Convert books array to productIds
      const payload = {
        name: promotionData.name,
        type: promotionData.type,
        discount: promotionData.discount || 0,
        startDate: promotionData.startDate,
        endDate: promotionData.endDate,
        description: promotionData.description,
        badgeText: promotionData.badgeText || null,
        productIds: promotionData.books || [],
      }
      const newPromotion = await promotionApi.createPromotion(payload)
      promotions.value.push({
        ...newPromotion,
        books: newPromotion.products ? newPromotion.products.map((p) => p.id) : [],
      })
      return newPromotion
    } catch (err) {
      error.value = err.message
      console.error('Failed to add promotion:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePromotion = async (id, updatedPromotion) => {
    loading.value = true
    error.value = null
    try {
      // Convert books array to productIds
      const payload = {
        name: updatedPromotion.name,
        type: updatedPromotion.type,
        discount: updatedPromotion.discount || 0,
        startDate: updatedPromotion.startDate,
        endDate: updatedPromotion.endDate,
        description: updatedPromotion.description,
        badgeText: updatedPromotion.badgeText || null,
        productIds: updatedPromotion.books || [],
      }
      console.log('Updating promotion with payload:', payload)
      const updated = await promotionApi.updatePromotion(id, payload)
      const index = promotions.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        promotions.value[index] = {
          ...updated,
          books: updated.products ? updated.products.map((p) => p.id) : [],
        }
      }
      return updated
    } catch (err) {
      error.value = err.message
      console.error('Failed to update promotion:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePromotion = async (id) => {
    loading.value = true
    error.value = null
    try {
      await promotionApi.deletePromotion(id)
      promotions.value = promotions.value.filter((p) => p.id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Failed to delete promotion:', err)
      throw err
    } finally {
      loading.value = false
    }
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
