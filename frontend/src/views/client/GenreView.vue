<template>
  <div class="genre-wrapper">
    <span class="main-text-style">{{ genreName }}</span>

    <div v-if="visibleBooks.length" class="book-grid">
      <BookComponent
        v-for="book in visibleBooks"
        :key="book.id"
        :product="book"
        :title="book.title"
        :author="book.author"
        :price="book.price"
        :discount="book.discount"
        :finalPrice="book.finalPrice"
        :image="`${API_BASE_URL}/uploads/products/${book.image}`"
        :rating="book.rating"
        @book-clicked="goToBook"
      />
    </div>

    <p v-else class="empty-text">
      No books found for this genre.
    </p>

    <div
      class="see-more-wrapper"
      v-if="filteredBooks.length > visibleCount"
    >
      <button class="see-more-btn" @click="showMore">
        See More
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// @ts-ignore
import { useBookStore } from '@/stores/BookData'
import BookComponent from '@/components/client/BookComponent.vue'

interface Product {
  id: number
  title: string
  author: string
  price: number
  discount: number
  finalPrice: number
  image: string
  rating: number
  genreIds: number[]
}

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()

const visibleCount = ref(10)
const API_BASE_URL = import.meta.env.VITE_API_BASE as string

const genreId = computed(() => Number(route.params.id))
const genreName = computed(() => route.params.name as string)

onMounted(async () => {
  if (!bookStore.products.length) {
    await bookStore.fetchProducts()
  }
})

const filteredBooks = computed<Product[]>(() => {
  if (genreId.value === 0) {
    return bookStore.discountedProducts
  }
  return bookStore.discountedProducts.filter((book: Product) =>
    book.genreIds.includes(genreId.value)
  )
})

const visibleBooks = computed<Product[]>(() =>
  filteredBooks.value.slice(0, visibleCount.value)
)

function showMore() {
  visibleCount.value += 12
}

function goToBook(book: Product) {
  router.push(`/books/${book.id}`)
}
</script>

<style scoped>
.genre-wrapper {
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

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 32px;
}

.empty-text {
  font-size: 18px;
  color: #888;
  text-align: center;
}

.see-more-wrapper {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.see-more-btn {
  padding: 12px 36px;
  border-radius: 40px;
  border: none;
  background-color: #3255fb;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Nunito';
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.see-more-btn:hover {
  background-color: #2643d6;
  transform: scale(1.05);
}
</style>