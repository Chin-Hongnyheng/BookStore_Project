// API configuration and base URL
const API_BASE_URL = 'http://localhost:3000'

// Genre API endpoints
export const genreApi = {
  // Get all genres
  async getAllGenres() {
    try {
      const response = await fetch(`${API_BASE_URL}/genres`)
      if (!response.ok) {
        throw new Error(`Failed to fetch genres: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching genres:', error)
      throw error
    }
  },

  // Get single genre by ID
  async getGenre(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/genres/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch genre: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching genre:', error)
      throw error
    }
  },

  // Create new genre
  async createGenre(genreData) {
    try {
      const response = await fetch(`${API_BASE_URL}/genres`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(genreData),
      })
      if (!response.ok) {
        throw new Error(`Failed to create genre: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating genre:', error)
      throw error
    }
  },

  // Update genre
  async updateGenre(id, genreData) {
    try {
      const response = await fetch(`${API_BASE_URL}/genres/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(genreData),
      })
      if (!response.ok) {
        throw new Error(`Failed to update genre: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error updating genre:', error)
      throw error
    }
  },

  // Delete genre
  async deleteGenre(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/genres/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to delete genre: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error deleting genre:', error)
      throw error
    }
  },
}
