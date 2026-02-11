import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productApi } from '@/services/productApi'

// Fallback mock data if backend is empty
const mockBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A classic American novel set in the Jazz Age.',
    price: 12.99,
    discount: 0,
    inStock: 50,
    pages: 180,
    language: 'English',
    published: '1925-04-10',
    rating: 4.8,
    genres: [],
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel about totalitarianism.',
    price: 13.99,
    discount: 0,
    inStock: 45,
    pages: 328,
    language: 'English',
    published: '1949-06-08',
    rating: 4.6,
    genres: [],
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A gripping tale of racial injustice and childhood innocence.',
    price: 14.99,
    discount: 0,
    inStock: 60,
    pages: 281,
    language: 'English',
    published: '1960-07-11',
    rating: 4.9,
    genres: [],
  },
]

export const useBookStore = defineStore('book', () => {
  const books = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch all products from backend
  const fetchBooks = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await productApi.getAllProducts()
      // Use mock data if backend returns empty array
      books.value = data && data.length > 0 ? data : mockBooks
      console.log('Books loaded:', books.value.length, 'items')
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch books from API, using mock data:', err)
      // Use mock data as fallback
      books.value = mockBooks
    } finally {
      loading.value = false
    }
  }

  // Add new product to backend
  const addBook = async (bookData) => {
    loading.value = true
    error.value = null
    try {
      const newBook = await productApi.createProduct(bookData)
      books.value.push(newBook)
      return newBook
    } catch (err) {
      error.value = err.message
      console.error('Failed to add book:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update product in backend
  const updateBook = async (id, bookData) => {
    loading.value = true
    error.value = null
    try {
      const updated = await productApi.updateProduct(id, bookData)
      const index = books.value.findIndex((b) => b.id === id)
      if (index !== -1) {
        books.value[index] = updated
      }
      return updated
    } catch (err) {
      error.value = err.message
      console.error('Failed to update book:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete product from backend
  const deleteBook = async (id) => {
    loading.value = true
    error.value = null
    try {
      await productApi.deleteProduct(id)
      books.value = books.value.filter((b) => b.id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Failed to delete book:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
  }
})
