<template>
  <div>
    <BookComponent
    v-for="product in productStore.discountedProducts"
    :key="product.id"
    :product="product"
    :title="product.title"
    :author="product.author"
    :price="product.price"
    :discount="product.discount"
    :finalPrice="product.finalPrice"
    :image="'http://localhost:3000/uploads/products/' + product.image"
    :rating="product.rating"
    />

  </div>
</template>

<script lang="ts">
import BookComponent from './components/BookComponent.vue';
import { useBookStore } from './stores/BookData';

export default {
  name: 'App.vue',
  setup() {
    const productStore = useBookStore();
    productStore.fetchGenres();
    productStore.fetchProducts();
    return {
      productStore,
    };
  },
  components: {
    BookComponent,
  },
};
</script>
