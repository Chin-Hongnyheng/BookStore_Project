<template>
  <div class="showcaseV2-container">
    <div class="showcaseV2-image-style">
      <img :src="book" />
    </div>

    <div class="showcaseV2-description">
      <span class="showcase-title">Novel</span>
      <span class="showcase-text">Tuesday Money Talks to Ghosts</span>
      <span class="showcase-author">Kate Racculia</span>
      <div class="showcase-value">
        <span class="showcase-price">$33.00</span>
        <span class="showcase-discount">12% Off</span>
      </div>
    </div>
  </div>
</template>
<script>
import book from '@/assets/book.png'
export default {
  name: 'ShowcaseV2Component',
  data() {
    return {
      book,
    }
  },
}
</script>
<style scoped>
.showcaseV2-description {
  flex: 1;
  padding: 0 30px 0 400px;
  font-family: 'Nunito';
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
}
.showcase-title {
  font-size: 32px;
  font-weight: 600;
}
.showcase-text {
  font-size: 48px;
  font-weight: 900;
}
.showcase-author {
  font-size: 24px;
  font-weight: 600;
}
.showcase-value {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
}
.showcase-price {
  font-size: 64px;
  font-weight: 900;
}
.showcase-discount {
  font-size: 48px;
  font-weight: 900;
  color: black;
  background-color: white;
  width: 255px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.showcaseV2-container {
  width: 70%;
  height: 404px;
  border-radius: 30px;
  background-color: black;
  margin: 0 auto;
  display: flex;
  align-items: center;

  transition: transform 0.3s ease;
}
.showcaseV2-container:hover {
  transform: scale(1.02);
}
.showcaseV2-image-style {
  height: 100%;
  border-radius: 30px 0 0 30px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}
.showcaseV2-image-style img {
  height: 100%;
  width: auto;
  object-fit: contain;
}
</style>
