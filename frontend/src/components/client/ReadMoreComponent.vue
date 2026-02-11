<template>
  <div class="readMore-container">
    <div class="BookDisplay">
      <BookDisplayComponent
        v-for="product in visibleProducts"
        :key="product.id"
        :title="product.title"
        :author="product.author"
        :image="'http://localhost:3000/uploads/products/' + product.image"
      />
    </div>
    <div class="readMore-inner">
      <span class="readMore-title">Why Shop with Us?</span>
      <span class="readMore-text"
        >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially
        unchanged.</span
      >
      <button class="readMore-btn">Read More</button>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import BookDisplayComponent from './BookDisplayComponent.vue'
import { useBookStore } from '@/stores/BookData'
export default {
  name: 'ReadMoreComponent',
  components: {
    BookDisplayComponent,
  },
  setup() {
    const productStore = useBookStore()

    const visibleProducts = computed(() => productStore.discountedProducts.slice(0, 9))
    return {
      visibleProducts,
    }
  },
}
</script>
<style scoped>
.BookDisplay {
  display: grid;
  grid-template-columns: repeat(3, 267px);
  column-gap: 50px;
  row-gap: 20px;

  position: absolute;
  width: max-content;
  justify-items: start;
  transform: rotate(15deg) translateY(-200px);
  right: 60%;
}
.BookDisplay > *:nth-child(3n - 1) {
  transform: translateY(100px);
}
.BookDisplay > *:nth-child(3n) {
  transform: translateY(-100px);
}
.readMore-container {
  width: 100%;
  height: 883px;
  background-color: rgb(230, 229, 225);
  display: flex;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
}
.readMore-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 884px;
  gap: 22px;
  position: absolute;
  right: 5%;
  top: 50%; /* middle of the container */
  transform: translateY(-50%);
}
.readMore-title {
  font-family: 'Nunito';
  color: #3255fb;
  font-size: 68px;
  font-weight: 900;
}
.readMore-text {
  font-family: 'Nunito';
  color: black;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  display: flex;

  max-width: 714px;
  text-align: center;
}
.readMore-btn {
  padding: 12px 36px;
  border-radius: 40px;
  border: none;
  background-color: #3255fb;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  width: 210px;
  height: 52px;
  font-family: 'Nunito';
}
.readMore-btn:hover {
  background-color: #2643d6;
  transform: scale(1.05);
}
</style>
