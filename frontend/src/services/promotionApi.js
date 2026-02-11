// API configuration and base URL
const API_BASE_URL = 'http://localhost:3000'

// Promotion API endpoints
export const promotionApi = {
  // Get all promotions
  async getAllPromotions() {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions`)
      if (!response.ok) {
        throw new Error(`Failed to fetch promotions: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching promotions:', error)
      throw error
    }
  },

  // Get single promotion by ID
  async getPromotion(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch promotion: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching promotion:', error)
      throw error
    }
  },

  // Create new promotion
  async createPromotion(promotionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotionData),
      })
      if (!response.ok) {
        throw new Error(`Failed to create promotion: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating promotion:', error)
      throw error
    }
  },

  // Update promotion
  async updatePromotion(id, promotionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotionData),
      })
      if (!response.ok) {
        throw new Error(`Failed to update promotion: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error updating promotion:', error)
      throw error
    }
  },

  // Delete promotion
  async deletePromotion(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to delete promotion: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error deleting promotion:', error)
      throw error
    }
  },
}
