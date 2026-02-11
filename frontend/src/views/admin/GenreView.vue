<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Manage Genres</h2>
        <p class="text-gray-600 mt-1">View and manage all book genres</p>
      </div>
      <button @click="openAddModal" class="btn btn-primary">
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Genre
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="genreStore.loading" class="text-center py-8">
      <p class="text-gray-600">Loading genres...</p>
    </div>

    <!-- Error state -->
    <div v-if="genreStore.error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-800">Error: {{ genreStore.error }}</p>
    </div>

    <!-- Genre Table -->
    <DataTable
      v-if="!genreStore.loading && !genreStore.error"
      :items="genreStore.genres"
      :columns="[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
      ]"
      @edit="editGenre"
      @delete="deleteGenre"
    />

    <!-- Add/Edit Modal -->
    <Modal
      v-if="showModal"
      :title="isEditing ? 'Edit Genre' : 'Add New Genre'"
      @close="closeModal"
      @submit="submitForm"
    >
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="form-group">
          <label for="name" class="label">Genre Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="input-field"
            required
            placeholder="Enter genre name"
          />
        </div>

        <div class="form-group">
          <label for="description" class="label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="input-field"
            rows="4"
            placeholder="Enter genre description"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="genreImage" class="label">Genre Image</label>
          <div class="space-y-2">
            <input
              id="genreImage"
              type="file"
              accept="image/*"
              @change="handleImageChange"
              class="input-field file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p class="text-xs text-gray-500">Upload an image file (JPG, PNG, etc.) - Optional</p>
            <div v-if="imagePreview" class="mt-2">
              <img :src="imagePreview" alt="Preview" class="w-24 h-24 object-cover rounded-md border" />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="svgIcon" class="label">SVG Icon Code</label>
          <textarea
            id="svgIcon"
            v-model="formData.svgIcon"
            class="input-field font-mono text-sm"
            rows="4"
            placeholder="<svg>...</svg>"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">Paste SVG code directly - Optional</p>
          <div v-if="formData.svgIcon" class="mt-2 p-2 bg-gray-100 rounded-md inline-block">
            <div v-html="formData.svgIcon" class="w-8 h-8"></div>
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGenreStore } from '@/stores/genreStore'
import DataTable from '@/components/admin/DataTable.vue'
import Modal from '@/components/admin/Modal.vue'

const route = useRoute()
const genreStore = useGenreStore()

const showModal = ref(false)
const isEditing = ref(false)
const currentGenreId = ref(null)
const selectedImageFile = ref(null)
const imagePreview = ref(null)

const formData = reactive({
  name: '',
  description: '',
  svgIcon: '',
})

// Fetch genres when component mounts
onMounted(async () => {
  await genreStore.fetchGenres()
})

// Reload data when route changes (navigating to this view)
watch(
  () => route.path,
  async () => {
    if (route.path === '/admin/genres') {
      await genreStore.fetchGenres()
    }
  },
)

const openAddModal = () => {
  isEditing.value = false
  currentGenreId.value = null
  formData.name = ''
  formData.description = ''
  formData.svgIcon = ''
  selectedImageFile.value = null
  imagePreview.value = null
  showModal.value = true
}

const editGenre = (genre) => {
  isEditing.value = true
  currentGenreId.value = genre.id
  formData.name = genre.name
  formData.description = genre.description || ''
  formData.svgIcon = genre.svgIcon || ''
  selectedImageFile.value = null
  imagePreview.value = genre.image ? `http://localhost:3000/uploads/genres/${genre.image}` : null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  formData.name = ''
  formData.description = ''
  formData.svgIcon = ''
  selectedImageFile.value = null
  imagePreview.value = null
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const submitForm = async () => {
  if (!formData.name.trim()) {
    alert('Please enter a genre name')
    return
  }

  try {
    if (isEditing.value) {
      await genreStore.updateGenre(currentGenreId.value, {
        name: formData.name,
        description: formData.description,
        svgIcon: formData.svgIcon,
      }, selectedImageFile.value)
    } else {
      await genreStore.addGenre({
        name: formData.name,
        description: formData.description,
        svgIcon: formData.svgIcon,
      }, selectedImageFile.value)
    }
    closeModal()
  } catch (error) {
    alert('Error saving genre. Please try again.')
  }
}

const deleteGenre = async (genre) => {
  if (confirm(`Are you sure you want to delete "${genre.name}"?`)) {
    try {
      await genreStore.deleteGenre(genre.id)
    } catch (error) {
      alert('Error deleting genre. Please try again.')
    }
  }
}
</script>
