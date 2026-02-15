<template>
  <div class="explore-wrapper">
    <ShowcaseV2Component />
    <div class="category-wrapper">
      <span class="main-header-style">All Categories</span>
      <div class="category-style">
        <CategoryComponent
          v-for="category in productStore.genres"
          :key="category.id"
          :category="category"
          :name="category.name"
          :image="`${API_BASE_URL}/uploads/genres/${category.image}`"
          @category-clicked="goToCategory"
        />
      </div>
    </div>

    <!-- Genre -->
    <div class="book-wrapper">
      <div class="arrow-style">
        <span class="category-text">Recommendation</span>
        <div class="arrow-buttons">
          <button class="scroll-btn left" @click="scrollLeft">
            <FontAwesomeIcon :icon="['fas', 'arrow-left']" class="arrow" />
          </button>
          <button class="scroll-btn right" @click="scrollRight">
            <FontAwesomeIcon :icon="['fas', 'arrow-right']" class="arrow" />
          </button>
        </div>
      </div>

      <div class="scroll-container" ref="bookScroll">
        <div class="book-style">
          <BookComponent
            v-for="product in productStore.discountedProducts"
            :key="product.id"
            :product="product"
            :title="product.title"
            :author="product.author"
            :price="Number(product.price)"
            :discount="Number(product.discount)"
            :finalPrice="Number(product.finalPrice)"
            :image="`${API_BASE_URL}/uploads/products/${product.image}`"
            :rating="Number(product.rating)"
            @book-clicked="goToBookProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import { useBookStore } from '@/stores/BookData'
import CategoryComponent from '@/components/client/CategoryComponent.vue'
import BookComponent from '@/components/client/BookComponent.vue'
import ShowcaseV2Component from '@/components/client/ShowcaseV2Component.vue'

const productStore = useBookStore()

productStore.fetchGenres()
productStore.fetchProducts()
productStore.fetchPromotions()

const bookScroll = ref<HTMLElement | null>(null)
const scrollAmount = 266

const scrollLeft = () => {
  if (bookScroll.value) {
    bookScroll.value.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    })
  }
}

const scrollRight = () => {
  if (bookScroll.value) {
    bookScroll.value.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }
}

// **Move env variable here**
const API_BASE_URL = import.meta.env.VITE_API_BASE

// Navigation methods
const goToCategory = (category: any) => {
  window.location.href = `/${category.name}/${category.id}`
}

const goToBookProduct = (product: any) => {
  window.location.href = `/books/${product.id}`
}
</script>

<style scoped>
.explore-wrapper {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.scroll-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid black;
  background-color: #e2e2e2;
  color: rgb(0, 0, 0);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;
}

.scroll-btn:hover {
  transform: scale(1.1);
  background-color: #3255fb;
  color: white;
  border-color: #3255fb;
}
.book-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.arrow-style {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}
.arrow-buttons {
  display: flex;
  gap: 20px;
}
.category-text {
  font-family: 'Nunito';
  color: #3255fb;
  font-weight: 900;
  font-size: 38px;
}
.arrow {
  width: 30px;
  height: 30px;
}
.scroll-container {
  width: 80%;
  margin: 0 auto;
  /* hide scrollbar */
  overflow-x: hidden;
  overflow-y: hidden;
}
.book-style {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  width: 80%;
}
.book-style > * {
  flex: 0 0 auto;
}
.category-style {
  display: flex;
  flex-wrap: wrap;
  gap: 45px;
  margin: 0 auto;
  width: 80%;
}
.main-header-style {
  /* display: flex;
    justify-content: flex-start; */
  width: 80%;
  margin: 0 auto;
  font-family: 'Nunito';
  color: #3255fb;
  font-weight: 900;
  font-size: 38px;
}
.category-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
