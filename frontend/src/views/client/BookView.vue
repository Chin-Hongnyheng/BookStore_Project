<template>
  <div class="book-page-container" v-if="book">
    <div class="book-card">
      <div class="left-group">
        <div class="cover-wrapper">
          <img :src="`http://localhost:3000/uploads/products/${book.image}`" class="book-image" />
        </div>

        <div class="meta-col">
          <div class="meta-item">
            <p class="label-text">Published:</p>
            <p class="value-text bold">{{ formatDate(book.published) }}</p>
          </div>
          <div class="genre-grid">
            <span v-for="genre in book.genres" :key="genre.id" class="genre-badge">
              {{ genre.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="details-col">
        <div class="header-section">
          <h1 class="main-title">{{ book.title }}</h1>
          <p class="author-name">By {{ book.author }}</p>
        </div>

        <div class="stats-row">
          <div class="stat-box">
            <span class="stat-label">Pages</span>
            <span class="stat-value">{{ book.pages }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Language</span>
            <span class="stat-value">{{ book.language }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Rating</span>
            <span class="stat-value">★ {{ book.rating }}</span>
          </div>
        </div>

        <div class="description-section">
          <h3 class="desc-title">Description</h3>
          <p class="desc-text">{{ book.description }}</p>
        </div>

        <div class="action-row">
          <div class="price-container">
            <p class="price-label">Price</p>
            <p class="price-value">${{ book.finalPrice?.toFixed(2) || book.price?.toFixed(2) }}</p>
          </div>

          <button class="add-to-cart" @click="handleAddToCart">
            Add to Cart
            <font-awesome-icon icon="shopping-cart" />
          </button>

          <div class="wishlist-icon" @click="toggleWishlist">
            <font-awesome-icon :icon="isWishlisted ? 'heart' : ['far', 'heart']" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-20">Loading Book Details...</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/BookData'
import { useCartStore } from '@/stores/cartStore'
import axios from 'axios'

const route = useRoute()
const bookStore = useBookStore()
const cartStore = useCartStore()
const book = ref<any>(null)
const isWishlisted = ref(false)
const userId = ref<number | null>(null)

// Parse JWT to get userId
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

const loadBook = async () => {
  const id = Number(route.params.id)
  if (!bookStore.products.length) {
    await bookStore.fetchProducts()
    await bookStore.fetchPromotions()
  }
  const foundProduct = bookStore.products.find((p) => Number(p.id) === id)
  if (foundProduct) {
    // Calculate final price with any applicable promotions
    const promotion = bookStore.promotions.find((promo) => promo.productId === foundProduct.id)
    book.value = {
      ...foundProduct,
      finalPrice: promotion ? foundProduct.price * (1 - promotion.discountPercentage / 100) : null,
    }
  } else {
    book.value = null
  }
  await checkWishlist()
}

const checkWishlist = async () => {
  if (!userId.value || !book.value) return
  try {
    const res = await axios.get(`http://localhost:3000/wishlists/${userId.value}`)
    const productIds = res.data.map((item: any) => item.product.id)
    isWishlisted.value = productIds.includes(book.value.id)
  } catch (err) {
    console.error('Wishlist fetch error', err)
  }
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const toggleWishlist = async () => {
  if (!userId.value) {
    alert('Please login first to use wishlist')
    return
  }
  const previousState = isWishlisted.value
  isWishlisted.value = !isWishlisted.value
  try {
    if (isWishlisted.value) {
      await axios.post('http://localhost:3000/wishlists', {
        userId: userId.value,
        productIds: [book.value.id],
      })
    } else {
      await axios.delete(`http://localhost:3000/wishlists/${userId.value}/${book.value.id}`)
    }
  } catch (err) {
    console.error('Wishlist toggle error', err)
    isWishlisted.value = previousState
  }
}

const handleAddToCart = () => {
  if (book.value) {
    cartStore.addToCart(book.value)
  }
}

onMounted(() => {
  const token = sessionStorage.getItem('token')
  if (token) {
    const payload = parseJwt(token)
    userId.value = payload?.sub ?? null
  }
  loadBook()
})
watch(() => route.params.id, loadBook)
</script>

<style scoped>
/* Paste your original CSS here - it was already high quality! */
.book-page-container {
  font-family: 'Nunito', sans-serif;
  background-color: #eff3ff;
  min-height: 100vh;
  padding: 40px;
}
/* ... other styles ... */
</style>
