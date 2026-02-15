// API configuration and base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE

// Coupon API endpoints
export const couponApi = {
  // Get all coupons
  async getAllCoupons() {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons`)
      if (!response.ok) {
        throw new Error(`Failed to fetch coupons: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching coupons:', error)
      throw error
    }
  },

  // Get single coupon by ID
  async getCoupon(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch coupon: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching coupon:', error)
      throw error
    }
  },

  // Validate coupon code
  async validateCoupon(code, cartTotal, isFirstTimeUser = false) {
    try {
      const params = new URLSearchParams({
        code,
        cartTotal: cartTotal.toString(),
        isFirstTimeUser: isFirstTimeUser.toString(),
      })
      const response = await fetch(`${API_BASE_URL}/coupons/validate?${params}`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Invalid coupon')
      }
      return await response.json()
    } catch (error) {
      console.error('Error validating coupon:', error)
      throw error
    }
  },

  // Create new coupon
  async createCoupon(couponData) {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create coupon')
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating coupon:', error)
      throw error
    }
  },

  // Update coupon
  async updateCoupon(id, couponData) {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update coupon')
      }
      return await response.json()
    } catch (error) {
      console.error('Error updating coupon:', error)
      throw error
    }
  },

  // Use coupon (increment usage count)
  async useCoupon(code) {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons/use/${code}`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error(`Failed to use coupon: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error using coupon:', error)
      throw error
    }
  },

  // Delete coupon
  async deleteCoupon(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/coupons/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to delete coupon: ${response.statusText}`)
      }
      return true
    } catch (error) {
      console.error('Error deleting coupon:', error)
      throw error
    }
  },
}
