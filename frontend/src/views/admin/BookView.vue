<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Manage Books</h2>
        <p class="text-gray-600 mt-1">View and manage all books in the store</p>
      </div>
      <button @click="openAddModal" class="btn btn-primary">
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Book
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="bookStore.loading" class="text-center py-8">
      <p class="text-gray-600">Loading books...</p>
    </div>

    <!-- Error state -->
    <div v-if="bookStore.error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-800">Error: {{ bookStore.error }}</p>
    </div>

    <!-- Books Table -->
    <DataTable
      v-if="!bookStore.loading && !bookStore.error"
      :items="bookStore.books"
      :columns="[
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
        { key: 'author', label: 'Author' },
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price' },
      ]"
      @edit="editBook"
      @delete="deleteBook"
    >
      <template #cell-price="{ item }"> ${{ parseFloat(item.price).toFixed(2) }} </template>
      <template #toolbar>
        <button class="btn btn-secondary btn-sm">
          <font-awesome-icon icon="download" class="mr-1" />
          Export
        </button>
      </template>
    </DataTable>

    <!-- Add/Edit Modal -->
    <Modal
      v-if="showModal"
      :title="isEditing ? 'Edit Book' : 'Add New Book'"
      @close="closeModal"
      @submit="submitForm"
    >
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="form-group">
          <label for="title" class="label">Book Title</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            class="input-field"
            required
            placeholder="Enter book title"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="author" class="label">Author</label>
            <input
              id="author"
              v-model="formData.author"
              type="text"
              class="input-field"
              required
              placeholder="Enter author name"
            />
          </div>

          <div class="form-group">
            <label for="genre" class="label">Genre</label>
            <select v-model="formData.selectedGenreId" class="input-field" @change="updateGenreIds">
              <option value="">Select a genre</option>
              <option v-for="genre in genreStore.genres || []" :key="genre.id" :value="genre.id">
                {{ genre.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="price" class="label">Price ($)</label>
            <input
              id="price"
              v-model.number="formData.price"
              type="number"
              class="input-field"
              step="0.01"
              required
              placeholder="0.00"
            />
          </div>

          <div class="form-group">
            <label for="inStock" class="label">In Stock</label>
            <input
              id="inStock"
              v-model.number="formData.inStock"
              type="number"
              class="input-field"
              required
              placeholder="0"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="pages" class="label">Pages</label>
            <input
              id="pages"
              v-model.number="formData.pages"
              type="number"
              class="input-field"
              required
              placeholder="200"
            />
          </div>

          <div class="form-group">
            <label for="language" class="label">Language</label>
            <input
              id="language"
              v-model="formData.language"
              type="text"
              class="input-field"
              required
              placeholder="English"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="rating" class="label">Rating</label>
            <input
              id="rating"
              v-model.number="formData.rating"
              type="number"
              class="input-field"
              min="0"
              max="5"
              step="0.1"
              placeholder="4.5"
            />
          </div>

          <div class="form-group">
            <label for="published" class="label">Published Date</label>
            <input id="published" v-model="formData.published" type="date" class="input-field" />
          </div>
        </div>

        <div class="form-group">
          <label for="description" class="label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="input-field"
            rows="3"
            placeholder="Enter book description"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="label">Book Groups</label>
          <div class="space-y-2">
            <label v-for="group in bookGroups" :key="group" class="flex items-center gap-2">
              <input
                type="checkbox"
                :value="group"
                :checked="formData.groups.includes(group)"
                @change="toggleGroup(group)"
                class="w-4 h-4"
              />
              <span class="text-sm">{{ group }}</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="cover" class="label">Cover Image</label>
          <div class="space-y-2">
            <input
              id="coverFile"
              type="file"
              accept="image/*"
              @change="handleImageChange"
              class="input-field file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p class="text-xs text-gray-500">Upload an image file (JPG, PNG, etc.)</p>
            <div v-if="imagePreview" class="mt-2">
              <img :src="imagePreview" alt="Preview" class="w-32 h-40 object-cover rounded-md border" />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/bookStore'
import { useGenreStore } from '@/stores/genreStore'
import DataTable from '@/components/admin/DataTable.vue'
import Modal from '@/components/admin/Modal.vue'

const route = useRoute()
const bookStore = useBookStore()
const genreStore = useGenreStore()

const bookGroups = ['New', 'Featured', 'Trending', 'Hot']

const showModal = ref(false)
const isEditing = ref(false)
const currentBookId = ref(null)
const selectedImageFile = ref(null)
const imagePreview = ref(null)

const formData = reactive({
  title: '',
  author: '',
  genre: '',
  selectedGenreId: '',
  price: 0,
  inStock: 0,
  pages: 0,
  language: 'English',
  published: '',
  description: '',
  cover: '',
  groups: [],
  rating: 4.0,
  reviews: 0,
  genreIds: [],
})

// Fetch books when component mounts
onMounted(async () => {
  await genreStore.fetchGenres()
  await bookStore.fetchBooks()
})

// Reload data when route changes (navigating to this view)
watch(
  () => route.path,
  async () => {
    if (route.path === '/admin/books') {
      await bookStore.fetchBooks()
    }
  },
)

const openAddModal = () => {
  isEditing.value = false
  currentBookId.value = null
  resetForm()
  showModal.value = true
}

const editBook = (book) => {
  isEditing.value = true
  currentBookId.value = book.id
  formData.title = book.title
  formData.author = book.author
  formData.genre = book.genre
  // Set selectedGenreId from book's genres array
  formData.selectedGenreId = book.genres && book.genres.length > 0 ? book.genres[0].id : ''
  formData.genreIds = book.genres ? book.genres.map(g => g.id) : []
  formData.price = book.price
  formData.inStock = book.inStock
  formData.pages = book.pages
  formData.language = book.language
  formData.published = book.published
  formData.description = book.description
  formData.cover = book.cover
  formData.groups = [...(book.groups || [])]
  formData.rating = book.rating
  formData.reviews = book.reviews
  selectedImageFile.value = null
  imagePreview.value = book.image ? `http://localhost:3000/uploads/products/${book.image}` : null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  formData.title = ''
  formData.author = ''
  formData.genre = ''
  formData.selectedGenreId = ''
  formData.price = 0
  formData.inStock = 0
  formData.pages = 0
  formData.language = 'English'
  formData.published = ''
  formData.description = ''
  formData.cover = ''
  formData.groups = []
  formData.rating = 4.0
  formData.reviews = 0
  formData.genreIds = []
  selectedImageFile.value = null
  imagePreview.value = null
}

const updateGenreIds = () => {
  if (formData.selectedGenreId) {
    formData.genreIds = [Number(formData.selectedGenreId)]
  } else {
    formData.genreIds = []
  }
}

const toggleGroup = (group) => {
  const index = formData.groups.indexOf(group)
  if (index > -1) {
    formData.groups.splice(index, 1)
  } else {
    formData.groups.push(group)
  }
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const submitForm = async () => {
  if (
    !formData.title.trim() ||
    !formData.author.trim() ||
    !formData.price ||
    !formData.inStock ||
    !formData.pages ||
    !formData.language.trim()
  ) {
    alert('Please fill in all required fields')
    return
  }

  // Ensure genreIds is updated from selection
  updateGenreIds()

  try {
    if (isEditing.value) {
      await bookStore.updateBook(currentBookId.value, {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        price: formData.price,
        inStock: formData.inStock,
        pages: formData.pages,
        language: formData.language,
        published: formData.published,
        rating: formData.rating,
        genreIds: formData.genreIds,
      }, selectedImageFile.value)
    } else {
      await bookStore.addBook({
        title: formData.title,
        author: formData.author,
        description: formData.description,
        price: formData.price,
        inStock: formData.inStock,
        pages: formData.pages,
        language: formData.language,
        published: formData.published,
        genreIds: formData.genreIds,
      }, selectedImageFile.value)
    }
    closeModal()
  } catch (error) {
    alert('Error saving book: ' + error.message)
  }
}

const deleteBook = async (book) => {
  if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
    try {
      await bookStore.deleteBook(book.id)
    } catch (error) {
      alert('Error deleting book. Please try again.')
    }
  }
}
</script>
