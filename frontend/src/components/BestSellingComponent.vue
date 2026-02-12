<template>
  <div class="best-selling-wrapper">
    <span class="main-text-style">Best Selling Book</span>

    <div class="scroll-container">
      <div class="book-style">
        <BookComponent
          v-for="product in store.bestSellingBooks"
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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/BookData'
import BookComponent from '@/components/BookComponent.vue'

const store = useBookStore()
const router = useRouter()


onMounted(async () => {
  if (!store.products.length) {
    await store.fetchProducts()
  }
})

function goToBookProduct(product) {
  router.push(`/books/${product.id}`)
}
</script>


<style scoped>
.best-selling-wrapper {
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
  display: flex;
  justify-content: flex-start; 
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
