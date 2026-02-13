<template>
  <div class="genre-container" @click="handleClick">
    <span class="item-text">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'GenreV2Component',
  props: {
    genre: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit('genre-clicked', this.genre)
    },
  },
}
</script>

<style scoped>
.genre-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 50px;
  min-width: 200px;
  border-radius: 10px;
  background-color: #3255fb;
  color: white;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease,
    color 0.3s ease;
  flex-shrink: 0;
}

.genre-container:hover {
  background-color: white;
  color: #3255fb;
  transform: scale(1.05);
}

.item-text {
  font-family: 'Nunito';
  font-size: 20px;
  font-weight: bold;
  color: currentColor;
  text-align: center;
  padding: 0 10px;
}
</style>
