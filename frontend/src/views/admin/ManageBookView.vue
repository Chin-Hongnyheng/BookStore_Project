<template>
  <div class="space-y-6 p-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Book Inventory</h2>
        <p class="text-gray-600 mt-1">Manage store products and pricing</p>
      </div>
      <button @click="openAddModal" class="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition">
        <font-awesome-icon icon="plus" class="mr-2" />
        Add New Book
      </button>
    </div>

    <DataTable
      v-if="!bookStore.loading"
      :items="bookStore.books"
      :columns="[
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
        { key: 'author', label: 'Author' },
        { key: 'price', label: 'Base Price' },
        { key: 'inStock', label: 'Stock' }
      ]"
      @edit="editBook"
      @delete="deleteBook"
    >
      <template #cell-price="{ item }"> ${{ parseFloat(item.price).toFixed(2) }} </template>
    </DataTable>

    <Modal v-if="showModal" :title="isEditing ? 'Edit Book' : 'Add New Book'" @close="closeModal">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label class="label">Book Title</label>
            <input v-model="formData.title" type="text" class="input-field" required />
          </div>
          <div class="form-group">
            <label class="label">Author</label>
            <input v-model="formData.author" type="text" class="input-field" required />
          </div>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <div class="form-group">
            <label class="label">Price ($)</label>
            <input v-model.number="formData.price" type="number" step="0.01" class="input-field" required />
          </div>
          <div class="form-group">
            <label class="label">Stock</label>
            <input v-model.number="formData.inStock" type="number" class="input-field" required />
          </div>
          <div class="form-group">
            <label class="label">Pages</label>
            <input v-model.number="formData.pages" type="number" class="input-field" required />
          </div>
          <div class="form-group">
            <label class="label">Rating</label>
            <input v-model.number="formData.rating" type="number" step="0.1" min="0" max="5" class="input-field" />
          </div>
        </div>

        <div class="form-group">
          <label class="label">Genre</label>
          <select v-model="formData.selectedGenreId" class="input-field" @change="updateGenreIds">
            <option value="">Select Genre</option>
            <option v-for="genre in genreStore.genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="label">Description</label>
          <textarea v-model="formData.description" class="input-field" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label class="label">Cover Image</label>
          <input type="file" @change="handleImageChange" class="input-field" accept="image/*" />
          <div v-if="imagePreview" class="mt-2">
            <img :src="imagePreview" class="w-20 h-28 object-cover rounded shadow" />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button type="button" @click="closeModal" class="px-4 py-2 border rounded-md">Cancel</button>
          <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md font-bold">Save Book</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import { useGenreStore } from '@/stores/genreStore'
import DataTable from '@/components/admin/DataTable.vue'
import Modal from '@/components/admin/Modal.vue'

const bookStore = useBookStore()
const genreStore = useGenreStore()
const showModal = ref(false)
const isEditing = ref(false)
const currentBookId = ref(null)
const selectedImageFile = ref(null)
const imagePreview = ref(null)

const formData = reactive({
  title: '', author: '', selectedGenreId: '', price: 0, 
  inStock: 0, pages: 0, language: 'English', published: '', 
  description: '', rating: 4.0, genreIds: []
})

onMounted(async () => {
  await Promise.all([genreStore.fetchGenres(), bookStore.fetchBooks()])
})

const openAddModal = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const editBook = (book) => {
  isEditing.value = true
  currentBookId.value = book.id
  Object.assign(formData, {
    ...book,
    selectedGenreId: book.genres?.[0]?.id || '',
    genreIds: book.genres?.map(g => g.id) || []
  })
  imagePreview.value = book.image ? `http://localhost:3000/uploads/products/${book.image}` : null
  showModal.value = true
}

const resetForm = () => {
  Object.assign(formData, { title: '', author: '', price: 0, inStock: 0, pages: 0, rating: 4.0, genreIds: [] })
  selectedImageFile.value = null
  imagePreview.value = null
}

const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedImageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const submitForm = async () => {
  formData.genreIds = formData.selectedGenreId ? [Number(formData.selectedGenreId)] : []
  try {
    if (isEditing.value) {
      await bookStore.updateBook(currentBookId.value, formData, selectedImageFile.value)
    } else {
      await bookStore.addBook(formData, selectedImageFile.value)
    }
    showModal.value = false
  } catch (err) { alert(err.message) }
}

const deleteBook = async (book) => {
  if (confirm(`Delete ${book.title}?`)) await bookStore.deleteBook(book.id)
}
</script>