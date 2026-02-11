<template>
  <div class="genre-view">
    <h1 class="genre-title">{{ genreName }}</h1>

    <div v-if="filteredBooks.length" class="book-grid">
      <BookComponent
        v-for="book in filteredBooks"
        :key="book.id"
        :product="book"
        :title="book.title"
        :author="book.author"
        :price="book.price"
        :discount="book.discount"
        :finalPrice="book.finalPrice"
        :image="'http://localhost:3000/uploads/products/' + book.image"
        :rating="book.rating"
        @book-clicked="goToBook"
      />
    </div>

    <p v-else class="empty-text">
      No books found for this genre.
    </p>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookStore } from '@/stores/BookData'
import BookComponent from '@/components/BookComponent.vue'

export default {
  name: 'GenreView',
  components: { BookComponent },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const bookStore = useBookStore()

    const genreId = computed(() => Number(route.params.id))
    const genreName = computed(() => route.params.name)

    onMounted(async () => {
      if (!bookStore.products.length) {
        await bookStore.fetchProducts()
      }
    })

    const filteredBooks = computed(() => {
      return bookStore.discountedProducts.filter(book =>
        book.genreIds.includes(genreId.value)
      )
    })

    const goToBook = (book: any) => {
      router.push(`/books/${book.id}`)
    }

    return {
      genreName,
      filteredBooks,
      goToBook
    }
  }
}
</script>

<style scoped>
.genre-view {
  padding: 40px 80px;
}

.genre-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  text-transform: capitalize;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 32px;
}

.empty-text {
  font-size: 18px;
  color: #888;
}
</style>
