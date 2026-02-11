// API configuration and base URL
const API_BASE_URL = 'http://localhost:3000'

// Product API endpoints
export const productApi = {
  // Get all products
  async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`)
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  // Get single product by ID
  async getProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  },

  // Create new product
  async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  // Update product
  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },

  // Delete product
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  },
}
