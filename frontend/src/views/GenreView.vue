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
        :image="'http://localhost:3000/uploads/products/' + book.image"
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


<script lang="ts">
import { computed, ref, onMounted } from 'vue'
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

    const visibleCount = ref(10)

    const genreId = computed(() => Number(route.params.id))
    const genreName = computed(() => route.params.name)

    onMounted(async () => {
      if (!bookStore.products.length) {
        await bookStore.fetchProducts()
      }
    })

    const filteredBooks = computed(() => {
      if (genreId.value === 0) {
        return bookStore.discountedProducts
      }

      return bookStore.discountedProducts.filter(book =>
        book.genreIds.includes(genreId.value)
      )
    })

    const visibleBooks = computed(() =>
      filteredBooks.value.slice(0, visibleCount.value)
    )

    function showMore() {
      visibleCount.value += 12
    }

    function goToBook(book: any) {
      router.push(`/books/${book.id}`)
    }

    return {
      genreName,
      filteredBooks,
      visibleBooks,
      visibleCount,
      showMore,
      goToBook,
    }
  },
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

