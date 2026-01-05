<template>
  <div class="book">
    <div class="image-style">
      <img :src="image" />
    </div>

    <!-- Rating Box -->
    <div class="rating-box">
      <span class="star">★</span>
      <span class="rating">{{ rating }}</span>
    </div>

    <div class="title-author">
      <span class="author-style">{{ author }}</span>
      <span class="title-style">{{ title }}</span>
    </div>
    <div>{{ price }}</div>
    <div>{{ finalPrice }}</div>
    <div>{{ discount }}</div>
  </div>
</template>

<script>
export default {
  name: 'BookComponent',
  props: {
    product: { type: Object, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap');

.book {
  width: 257px;
  height: 654px;
  display: flex;
  flex-direction: column;
}

.image-style {
  width: 100%;
  height: 383px;
  border-radius: 20px;
  overflow: hidden;
}

.image-style img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

/* Rating Box */
.rating-box {
  width: 90px;
  height: 42px;
  background-color: #3255FB;
  border: 1px solid white;
  border-radius: 40px;

  display: flex;
  align-items: center;     /* vertical center */
  justify-content: center; /* horizontal center */
  gap: 2px;               
}

.star {
  color: yellow;
  font-size: 25px;
  line-height: 25px;
}

.rating {
  font-family: 'Urbanist', sans-serif;
  font-size: 22px;
  color: white;
  font-weight:600;
}
.title-author{
  display:flex;
  flex-direction:column;
  gap: 12px;
  align-items: flex-start;
}
.author-style{
  font-family: 'Urbanist', sans-serif;
  font-size: 16px;
  color: 848C8E;
}
.title-style{
  font-size: 22x;
  font-family: 'Urbanist', sans-serif;
  color: black;
  font-weight: bold;
}


</style>
