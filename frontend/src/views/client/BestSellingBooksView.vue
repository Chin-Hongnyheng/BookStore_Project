<template>
  <div class="best-selling-container">
    <div class="genre-wrapper">
      <span class="category-text">Filter Category</span>

      <div class="scroll-container" ref="genreScroll">
        <div class="genre-style">
          <GenreV2Component
            :genre="{ id: 0, name: 'All Books' }"
            name="All"
            @genre-clicked="goToGenre"
          />

          <GenreV2Component
            v-for="genre in store.genres"
            :key="genre.id"
            :genre="genre"
            :name="genre.name"
            @genre-clicked="goToGenre"
          />
        </div>
      </div>
    </div>
    <BestSellingComponent />
    <RecommendationComponent />
  </div>
</template>

<script setup>
import BestSellingComponent from '@/components/client/BestSellingComponent.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/BookData'

import GenreV2Component from '@/components/client/GenreV2Component.vue'
import RecommendationComponent from '@/components/client/RecommendationComponent.vue'

const store = useBookStore()
const router = useRouter()

// Fetch data
onMounted(async () => {
  await store.fetchGenres()
})

function goToGenre(genre) {
  router.push(`/${genre.name}/${genre.id}`)
}
</script>

<style scoped>
.best-selling-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
.genre-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  margin: 0 auto;
}

.category-text {
  font-family: 'Nunito';
  color: #3255fb;
  font-weight: 900;
  font-size: 38px;
}

.scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.genre-style {
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
}
</style>
