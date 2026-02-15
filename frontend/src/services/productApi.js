// API configuration and base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE

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

  // Create new product with optional image file
  async createProduct(productData, imageFile = null) {
    try {
      const formData = new FormData()
      
      // Append all product fields
      Object.keys(productData).forEach(key => {
        if (productData[key] !== undefined && productData[key] !== null && productData[key] !== '') {
          if (Array.isArray(productData[key])) {
            productData[key].forEach(item => formData.append(key, item))
          } else {
            formData.append(key, productData[key])
          }
        }
      })
      
      // Append image file if provided
      if (imageFile) {
        formData.append('image', imageFile)
      }
      
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        body: formData,
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

  // Update product with optional image file
  async updateProduct(id, productData, imageFile = null) {
    try {
      const formData = new FormData()
      
      // Append all product fields
      Object.keys(productData).forEach(key => {
        if (productData[key] !== undefined && productData[key] !== null && productData[key] !== '') {
          if (Array.isArray(productData[key])) {
            productData[key].forEach(item => formData.append(key, item))
          } else {
            formData.append(key, productData[key])
          }
        }
      })
      
      // Append image file if provided
      if (imageFile) {
        formData.append('image', imageFile)
      }
      
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PATCH',
        body: formData,
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
