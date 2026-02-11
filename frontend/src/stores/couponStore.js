import { defineStore } from 'pinia'
import { ref } from 'vue'
import { couponApi } from '@/services/couponApi'

export const useCouponStore = defineStore('coupon', () => {
  const coupons = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch all coupons
  const fetchCoupons = async () => {
    loading.value = true
    error.value = null
    try {
      coupons.value = await couponApi.getAllCoupons()
      console.log('Coupons loaded:', coupons.value.length, 'items')
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch coupons:', err)
    } finally {
      loading.value = false
    }
  }

  // Add new coupon
  const addCoupon = async (couponData) => {
    loading.value = true
    error.value = null
    try {
      const newCoupon = await couponApi.createCoupon(couponData)
      coupons.value.push(newCoupon)
      return newCoupon
    } catch (err) {
      error.value = err.message
      console.error('Failed to add coupon:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update coupon
  const updateCoupon = async (id, couponData) => {
    loading.value = true
    error.value = null
    try {
      const updated = await couponApi.updateCoupon(id, couponData)
      const index = coupons.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        coupons.value[index] = updated
      }
      return updated
    } catch (err) {
      error.value = err.message
      console.error('Failed to update coupon:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete coupon
  const deleteCoupon = async (id) => {
    loading.value = true
    error.value = null
    try {
      await couponApi.deleteCoupon(id)
      coupons.value = coupons.value.filter((c) => c.id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Failed to delete coupon:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Validate coupon code (for cart use)
  const validateCoupon = async (code, cartTotal, isFirstTimeUser = false) => {
    try {
      return await couponApi.validateCoupon(code, cartTotal, isFirstTimeUser)
    } catch (err) {
      throw err
    }
  }

  return {
    coupons,
    loading,
    error,
    fetchCoupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    validateCoupon,
  }
})
