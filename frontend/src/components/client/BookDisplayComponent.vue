<template>
  <div class="book-display">
    <!-- Book Image -->
    <div class="image-style-display">
      <img :src="image" alt="Book Image" />
    </div>
    <!-- Author & Title -->
    <div class="title-author-display">
      <span class="author-style-display">{{ author }}</span>
      <span class="title-style-display">{{ title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BookDisplayComponent',
  props: {
    product: { type: Object, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
  },
}
</script>
<style scoped>
.book-display {
  width: 267px;
  /* height: 654px; */
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Nunito', sans-serif;
  /* transform:rotate(20deg); */
}
.image-style-display {
  width: 220px;
  aspect-ratio: 2 / 3;
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.image-style-display img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  object-position: center;
}
/* Author & Title */
.title-author-display {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.author-style-display {
  font-size: 16px;
  color: rgb(150, 149, 149);
}

.title-style-display {
  font-size: 22px;
  font-weight: bold;
  color: black;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-height: 1.3;
  /* reserve space for 2 lines */
  min-height: calc(1.3em * 2);
}
</style>
