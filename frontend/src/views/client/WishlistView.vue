<template>
  <div class="wishlist-wrapper">
    <span class="main-text-style">My Wishlist</span>
    <div class="scroll-container">
      <div class="book-style">
        <BookComponent
          v-for="product in wishlist"
          :key="product.id"
          :product="product"
          :title="product.title"
          :author="product.author"
          :price="Number(product.price)"
          :discount="Number(product.discount)"
          :finalPrice="Number(product.finalPrice)"
          :image="'http://localhost:3000/uploads/products/' + product.image"
          :rating="product.rating"
          @book-clicked="goToBookProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/BookData'
import BookComponent from '@/components/client/BookComponent.vue'

const store = useBookStore()
const router = useRouter()
const wishlist = ref<any[]>([])
const loading = ref(true)
const userId = ref<number | null>(null)

// Decode JWT safely
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

function goToBookProduct(product) {
  router.push(`/books/${product.id}`)
}

onMounted(async () => {
  const token = sessionStorage.getItem('token')
  if (!token) {
    loading.value = false
    return
  }

  const payload = parseJwt(token)
  userId.value = payload?.sub ?? null

  if (!userId.value) {
    loading.value = false
    return
  }

  // Fetch products and promotions first
  await store.fetchProducts()
  await store.fetchPromotions()

  try {
    const res = await axios.get(`http://localhost:3000/wishlists/${userId.value}`)

    // Map wishlist items to products with promotions applied
    const wishlistIds = res.data.map((item: any) => item.product.id)
    wishlist.value = store.products
      .filter((p: any) => wishlistIds.includes(p.id))
      .map((p: any) => {
        const promotion = store.promotions.find((promo: any) => promo.bookId === p.id)
        return {
          ...p,
          discount: promotion?.discount || p.discount || 0,
          finalPrice: promotion ? p.price * (1 - promotion.discount / 100) : p.price,
        }
      })
  } catch (err) {
    console.error('Error fetching wishlist:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.wishlist-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 80%;
  margin: 0 auto;
}

.main-text-style {
  font-family: 'Nunito';
  color: #3255fb;
  font-weight: 900;
  font-size: 38px;
}

.scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.book-style {
  display: flex;
  flex-wrap: nowrap;
  gap: 50px;
  width: max-content;
}

.book-style > * {
  flex: 0 0 auto;
}
</style>
