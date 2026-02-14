<template>
  <div class="homepage-container">
    <!-- <HeaderComponent /> -->
    <ShowcaseComponent />

    <!-- Genre -->
    <div class="genre-wrapper">
      <div class="arrow-style">
        <span class="category-text">Shop by Category</span>
        <div class="arrow-buttons">
          <button class="scroll-btn left" @click="scrollLeft">
            <FontAwesomeIcon :icon="['fas', 'arrow-left']" class="arrow" />
          </button>
          <button class="scroll-btn right" @click="scrollRight">
            <FontAwesomeIcon :icon="['fas', 'arrow-right']" class="arrow" />
          </button>
        </div>
      </div>

      <div class="scroll-container" ref="genreScroll">
        <div class="genre-style">
          <GenreComponent
            v-for="genre in productStore.genresWithCount"
            :key="genre.id"
            :name="genre.name"
            :count="genre.total"
            :svg-icon="genre.svgIcon"
          />
        </div>
      </div>
    </div>

    <!-- Book -->
    <div class="book-wrapper">
      <span class="main-text-style">New Arrivals</span>
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
        />
      </div>
    </div>

    <div
      class="see-more-wrapper"
      v-if="visibleProducts.length < productStore.discountedProducts.length"
    >
      <button class="see-more-btn" @click="showMore">See More</button>
    </div>

    <!-- ReadMore -->
    <ReadMoreComponent />
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import BookComponent from '@/components/client/BookComponent.vue'
import ShowcaseComponent from '@/components/client/ShowcaseComponent.vue'
import { useBookStore } from '@/stores/BookData'
import ReadMoreComponent from '@/components/client/ReadMoreComponent.vue'
import GenreComponent from '@/components/client/GenreComponent.vue'

export default {
  name: 'HomeView',
  setup() {
    const productStore = useBookStore()
    productStore.fetchGenres()
    productStore.fetchProducts()
    productStore.fetchPromotions()
    productStore.fetchGenreCounts()

    const visibleCount = ref(10)

    const visibleProducts = computed(() =>
      productStore.discountedProducts.slice(0, visibleCount.value),
    )

    const showMore = () => {
      visibleCount.value += 10
    }

    const genreScroll = ref<HTMLElement | null>(null)
    const scrollAmount = 266 // width of one genre + gap

    const scrollLeft = () => {
      if (genreScroll.value) {
        genreScroll.value.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth',
        })
      }
    }

    const scrollRight = () => {
      if (genreScroll.value) {
        genreScroll.value.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        })
      }
    }
    return {
      productStore,
      visibleProducts,
      showMore,
      scrollLeft,
      scrollRight,
      genreScroll,
    }
  },
  components: {
    BookComponent,
    ShowcaseComponent,
    ReadMoreComponent,
    GenreComponent,
  },
}
</script>
<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.genre-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.book-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.scroll-container {
  width: 80%;
  margin: 0 auto;
  /* hide scrollbar */
  overflow-x: hidden;
  overflow-y: hidden;
}
.genre-style {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
}

/* prevents shrinking/growing of each genre */
.genre-style > * {
  flex: 0 0 auto;
}
.main-text-style {
  display: flex;
  justify-content: flex-start;
  width: 80%;
  margin: 0 auto;
  font-family: 'Nunito';
  color: #3255fb;
  font-weight: 900;
  font-size: 38px;
}
.arrow-style {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

.category-text {
  font-family: 'Nunito';
  color: #3255fb;
  font-weight: 900;
  font-size: 38px;
}

.arrow-buttons {
  display: flex;
  gap: 20px;
}

.arrow {
  width: 30px;
  height: 30px;
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
.book-style {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  width: 80%;
  justify-content: flex-start;
  margin: 0 auto;
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
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.see-more-btn:hover {
  background-color: #2643d6;
  transform: scale(1.05);
}
</style>
