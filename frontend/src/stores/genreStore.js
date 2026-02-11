import { defineStore } from 'pinia'
import { ref } from 'vue'
import { genreApi } from '@/services/genreApi'

export const useGenreStore = defineStore('genre', () => {
  const genres = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch all genres from backend
  const fetchGenres = async () => {
    loading.value = true
    error.value = null
    try {
      genres.value = await genreApi.getAllGenres()
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch genres:', err)
    } finally {
      loading.value = false
    }
  }

  // Add new genre to backend
  const addGenre = async (genreData) => {
    loading.value = true
    error.value = null
    try {
      const newGenre = await genreApi.createGenre(genreData)
      genres.value.push(newGenre)
      return newGenre
    } catch (err) {
      error.value = err.message
      console.error('Failed to add genre:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update genre in backend
  const updateGenre = async (id, updatedGenre) => {
    loading.value = true
    error.value = null
    try {
      const updated = await genreApi.updateGenre(id, updatedGenre)
      const index = genres.value.findIndex((g) => g.id === id)
      if (index !== -1) {
        genres.value[index] = updated
      }
      return updated
    } catch (err) {
      error.value = err.message
      console.error('Failed to update genre:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete genre from backend
  const deleteGenre = async (id) => {
    loading.value = true
    error.value = null
    try {
      await genreApi.deleteGenre(id)
      genres.value = genres.value.filter((g) => g.id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Failed to delete genre:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    genres,
    loading,
    error,
    fetchGenres,
    addGenre,
    updateGenre,
    deleteGenre,
  }
})
