<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Manage Promotions</h2>
        <p class="text-gray-600 mt-1">Create and manage all promotional campaigns</p>
      </div>
      <button @click="openAddModal" class="btn btn-primary">
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Promotion
      </button>
    </div>

    <!-- Promotions Table -->
    <DataTable
      :items="promotionStore.promotions"
      :columns="[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'discount', label: 'Discount' },
        { key: 'status', label: 'Status' },
        { key: 'startDate', label: 'Start Date' },
      ]"
      @edit="editPromotion"
      @delete="deletePromotion"
    >
      <template #cell-discount="{ item }">
        <template v-if="item.type === 'Hot Badge' || item.type === 'Buy 1 Get 1'">—</template>
        <template v-else-if="item.type === '% Off'">{{ Number(item.discount).toFixed(0) }}%</template>
        <template v-else>${{ Number(item.discount).toFixed(2) }}</template>
      </template>
      <template #cell-status="{ item }">
        <span
          :class="[
            'badge',
            item.status === 'Active'
              ? 'badge-success'
              : item.status === 'Upcoming'
                ? 'badge-warning'
                : 'badge-danger',
          ]"
        >
          {{ item.status }}
        </span>
      </template>
    </DataTable>

    <!-- Add/Edit Modal -->
    <Modal
      v-if="showModal"
      :title="isEditing ? 'Edit Promotion' : 'Add New Promotion'"
      @close="closeModal"
      @submit="submitForm"
    >
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="form-group">
          <label for="name" class="label">Promotion Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="input-field"
            required
            placeholder="e.g., Summer Sale"
          />
        </div>

        <div class="form-group">
          <label for="type" class="label">Promotion Type</label>
          <select v-model="formData.type" class="input-field" required>
            <option value="">Select promotion type</option>
            <option value="Sale">Sale (Fixed Amount Off)</option>
            <option value="% Off">Percentage Off</option>
            <option value="Hot Badge">Hot Badge (No Discount)</option>
            <option value="Buy 1 Get 1">Buy 1 Get 1 Free</option>
          </select>
        </div>

        <div v-if="requiresDiscountInput" class="form-group">
          <label for="discount" class="label">
            Discount {{ formData.type === '% Off' ? '(%)' : '($)' }}
          </label>
          <input
            id="discount"
            v-model.number="formData.discount"
            type="number"
            class="input-field"
            step="0.01"
            required
            placeholder="Enter discount amount"
          />
        </div>

        <div v-if="formData.type === 'Hot Badge'" class="form-group">
          <label for="badgeText" class="label">Badge Text</label>
          <input
            id="badgeText"
            v-model="formData.badgeText"
            type="text"
            class="input-field"
            maxlength="20"
            placeholder="e.g., 🔥 HOT, NEW!, TRENDING"
          />
          <p class="text-xs text-gray-500 mt-1">Leave empty for default: 🔥 HOT</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="startDate" class="label">Start Date</label>
            <input
              id="startDate"
              v-model="formData.startDate"
              type="date"
              class="input-field"
              required
            />
          </div>

          <div class="form-group">
            <label for="endDate" class="label">End Date</label>
            <input
              id="endDate"
              v-model="formData.endDate"
              type="date"
              class="input-field"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="label">Select Books</label>

          <!-- Book Filters -->
          <div class="flex gap-4 mb-3">
            <div class="flex-1">
              <select v-model="bookFilter.genre" class="input-field text-sm">
                <option value="">All Genres</option>
                <option v-for="genre in genreStore.genres" :key="genre.id" :value="genre.id">
                  {{ genre.name }}
                </option>
              </select>
            </div>
            <div class="flex-1">
              <select v-model="bookFilter.sort" class="input-field text-sm">
                <option value="title">Sort by Title</option>
                <option value="newest">Sort by Newest</option>
                <option value="author">Sort by Author</option>
              </select>
            </div>
          </div>

          <!-- Filtered Books List -->
          <div class="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
            <template v-if="filteredBooks.length > 0">
              <label 
                v-for="book in filteredBooks" 
                :key="book.id" 
                class="flex items-center gap-2"
                :class="{ 'opacity-50': getBookPromotion(book.id) }"
              >
                <input
                  type="checkbox"
                  :value="book.id"
                  :checked="formData.books.includes(book.id)"
                  :disabled="!!getBookPromotion(book.id)"
                  @change="toggleBook(book.id)"
                  class="w-4 h-4"
                />
                <span class="text-sm flex-1">{{ book.title }} - {{ book.author }}</span>
                <span 
                  v-if="getBookPromotion(book.id)" 
                  class="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded"
                >
                  In "{{ getBookPromotion(book.id) }}"
                </span>
              </label>
            </template>
            <p v-else class="text-sm text-gray-500 text-center py-4">No books found</p>
          </div>
          <p class="text-xs text-gray-500 mt-1">{{ formData.books.length }} book(s) selected</p>
        </div>

        <div class="form-group">
          <label for="description" class="label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="input-field"
            rows="2"
            placeholder="Enter promotion description"
          ></textarea>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePromotionStore } from '@/stores/promotionStore'
import { useBookStore } from '@/stores/bookStore'
import { useGenreStore } from '@/stores/genreStore'
import DataTable from '@/components/admin/DataTable.vue'
import Modal from '@/components/admin/Modal.vue'

const route = useRoute()
const promotionStore = usePromotionStore()
const bookStore = useBookStore()
const genreStore = useGenreStore()

const showModal = ref(false)
const isEditing = ref(false)
const currentPromotionId = ref(null)

// Book filtering options
const bookFilter = reactive({
  genre: '',
  sort: 'title',
})

// Get book IDs that have active promotions (excluding the current promotion being edited)
const booksWithActivePromotions = computed(() => {
  const now = new Date()
  const activeBookIds = new Map() // Map of bookId -> promotion name
  
  promotionStore.promotions.forEach((promo) => {
    // Skip current promotion when editing
    if (isEditing.value && promo.id === currentPromotionId.value) return
    
    const promoStart = new Date(promo.startDate)
    const promoEnd = new Date(promo.endDate)
    const isActive = now >= promoStart && now <= promoEnd
    
    // Include Sale, % Off, and Buy 1 Get 1 promotions (not Hot Badge - it's just a label)
    const discountTypes = ['Sale', '% Off', 'Buy 1 Get 1']
    if (isActive && discountTypes.includes(promo.type)) {
      // Check products array from API or books array from store
      const productIds = promo.products?.map((p) => p.id) || promo.books || []
      productIds.forEach((id) => {
        if (!activeBookIds.has(id)) {
          activeBookIds.set(id, promo.name)
        }
      })
    }
  })
  
  return activeBookIds
})

// Computed filtered and sorted books
const filteredBooks = computed(() => {
  let books = [...bookStore.books]

  // Filter by genre
  if (bookFilter.genre) {
    books = books.filter((book) => {
      // Check if book has genres array (from API) or genreIds
      const bookGenreIds = book.genres ? book.genres.map((g) => g.id) : book.genreIds || []
      return bookGenreIds.includes(Number(bookFilter.genre))
    })
  }

  // Sort books
  if (bookFilter.sort === 'newest') {
    books.sort((a, b) => {
      const dateA = a.publishedDate ? new Date(a.publishedDate) : new Date(0)
      const dateB = b.publishedDate ? new Date(b.publishedDate) : new Date(0)
      return dateB - dateA // Newest first
    })
  } else if (bookFilter.sort === 'author') {
    books.sort((a, b) => (a.author || '').localeCompare(b.author || ''))
  } else {
    books.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
  }

  return books
})

// Check if a book has an active promotion
const getBookPromotion = (bookId) => {
  return booksWithActivePromotions.value.get(bookId)
}

// Check if the current type requires a discount input
const requiresDiscountInput = computed(() => {
  return formData.type === 'Sale' || formData.type === '% Off'
})

const formData = reactive({
  name: '',
  type: '',
  discount: 0,
  startDate: '',
  endDate: '',
  books: [],
  description: '',
  badgeText: '',
})

// Fetch promotions when component mounts
onMounted(async () => {
  await Promise.all([
    promotionStore.fetchPromotions(),
    bookStore.fetchBooks(),
    genreStore.fetchGenres(),
  ])
})

// Reload data when route changes (navigating to this view)
watch(
  () => route.path,
  async () => {
    if (route.path === '/admin/promotions') {
      await promotionStore.fetchPromotions()
    }
  },
)

const openAddModal = () => {
  isEditing.value = false
  currentPromotionId.value = null
  resetForm()
  resetBookFilter()
  showModal.value = true
}

const editPromotion = (promotion) => {
  isEditing.value = true
  currentPromotionId.value = promotion.id
  formData.name = promotion.name
  formData.type = promotion.type
  formData.discount = promotion.discount
  formData.startDate = promotion.startDate
  formData.endDate = promotion.endDate
  formData.books = [...promotion.books]
  formData.description = promotion.description
  formData.badgeText = promotion.badgeText || ''
  resetBookFilter()
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  formData.name = ''
  formData.type = ''
  formData.discount = 0
  formData.startDate = ''
  formData.endDate = ''
  formData.books = []
  formData.description = ''
  formData.badgeText = ''
}

const resetBookFilter = () => {
  bookFilter.genre = ''
  bookFilter.sort = 'title'
}

const toggleBook = (bookId) => {
  const index = formData.books.indexOf(bookId)
  if (index > -1) {
    formData.books.splice(index, 1)
  } else {
    formData.books.push(bookId)
  }
}

const submitForm = () => {
  if (!formData.name.trim() || !formData.type || !formData.startDate || !formData.endDate) {
    alert('Please fill in all required fields')
    return
  }

  // Only require discount for Sale and % Off types
  if (requiresDiscountInput.value && formData.discount === 0) {
    alert('Please enter a discount amount')
    return
  }

  if (new Date(formData.startDate) > new Date(formData.endDate)) {
    alert('Start date must be before end date')
    return
  }

  if (isEditing.value) {
    console.log('Submitting badgeText:', formData.badgeText)
    promotionStore.updatePromotion(currentPromotionId.value, {
      name: formData.name,
      type: formData.type,
      discount: formData.discount,
      startDate: formData.startDate,
      endDate: formData.endDate,
      books: formData.books,
      description: formData.description,
      badgeText: formData.badgeText || null,
    })
  } else {
    promotionStore.addPromotion({
      name: formData.name,
      type: formData.type,
      discount: formData.discount,
      startDate: formData.startDate,
      endDate: formData.endDate,
      books: formData.books,
      description: formData.description,
      badgeText: formData.badgeText || null,
    })
  }

  closeModal()
}

const deletePromotion = (promotion) => {
  if (confirm(`Are you sure you want to delete "${promotion.name}"?`)) {
    promotionStore.deletePromotion(promotion.id)
  }
}
</script>
