<template>
  <!-- New Arrivals Section -->
  <div class="new-arrivals-wrapper">
    <span class="main-text-style">New Arrivals</span>

    <!-- Scroll container -->
    <div class="scroll-container">
      <div class="book-style">
        <BookComponent
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
          :title="product.title"
          :author="product.author"
          :price="product.price"
          :discount="product.discount"
          :finalPrice="product.finalPrice"
          :image="'http://localhost:3000/uploads/products/' + product.image"
          :rating="product.rating"
          @book-clicked="goToBookProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/BookData'
import BookComponent from '@/components/client/BookComponent.vue'

const store = useBookStore()
const router = useRouter()

const visibleCount = ref(20)

const visibleProducts = computed(() => store.newArrivalProducts.slice(0, visibleCount.value))

onMounted(async () => {
  await store.fetchNewArrivals()
})

function goToBookProduct(product) {
  router.push(`/books/${product.id}`)
}
</script>

<style scoped>
.new-arrivals-wrapper {
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
