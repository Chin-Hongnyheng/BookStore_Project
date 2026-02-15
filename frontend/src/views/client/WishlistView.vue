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
          :price="product.price"
          :discount="product.discount"
          :finalPrice="product.finalPrice"
          :image="'https://bookstore-project-4ugp.onrender.com/uploads/products/' + product.image"
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
// @ts-ignore
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

function goToBookProduct(product : any) {
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

  try {
    const res = await axios.get(`https://bookstore-project-4ugp.onrender.com/wishlists/${userId.value}`)

    wishlist.value = res.data.map((item: any) => {
    const p = item.product
    const price = Number(p.price)
    const discount = Number(p.discount ?? 0)

    return {
      ...p,
      price,
      discount,
      finalPrice:
        discount > 0
          ? price - (price * discount) / 100
          : price,
    }
  })

  } catch (err) {
    console.error('Error fetching wishlist:', err)
  } finally {
    loading.value = false
  }

  await store.fetchProducts()
})
</script>

<style scoped>
.wishlist-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
