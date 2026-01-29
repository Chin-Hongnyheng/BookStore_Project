<template>
  <div class="book-view">
    <BookHeader />
  </div>
</template>

<script>
import BookHeader from '../components/BookHeader.vue'

export default {
  components: {
    BookHeader,
  },
}
</script>

<style scoped>
.book-view {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
</style>
