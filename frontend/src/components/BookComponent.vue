<template>
  <div class="book" @click="handleClick">
    <!-- Book Image -->
    <div class="image-style">
      <img :src="image" alt="Book Image" />
    </div>

    <!-- Rating Box -->
    <div class="rating-box">
      <span class="star">★</span>
      <span class="rating">{{ rating }}</span>
    </div>

    <!-- Author & Title -->
    <div class="title-author">
      <span class="author-style">{{ author }}</span>
      <span class="title-style">{{ title }}</span>
    </div>

    <!-- Price Section -->
    <div class="price-section">
      <!-- NO DISCOUNT -->
      <span
        v-if="discount === 0"
        class="finalPrice-style"
      >
        ${{ price.toFixed(2) }}
      </span>

      <!-- WITH DISCOUNT -->
      <template v-else>
        <span class="price-style">${{ price.toFixed(2) }}</span>
        <div class="finalPrice-discount">
          <span class="finalPrice-style">
            ${{ finalPrice.toFixed(2) }}
          </span>
          <span class="discount-style">{{ discount }}% Off</span>
        </div>
      </template>
    </div>

    <button class="button-btn">
      Add To Cart
      <font-awesome-icon icon="shopping-cart"/>
    </button>

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
  methods:{
    handleClick() {
      this.$emit('book-clicked', this.product)
    },
  }
};
</script>

<style scoped>
/* Import Nunito font */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

.book {
  width: 267px;
  /* height: 654px; */
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Nunito', sans-serif;
}

.image-style {
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.image-style:hover {
  transform: scale(1.05);
}

.image-style img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  object-position: center;
}

/* Rating Box */
.rating-box {
  width: 90px;
  height: 42px;
  background-color: #3255FB;
  border: 1px solid white;
  border-radius: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.star {
  color: yellow;
  font-size: 25px;
  line-height: 20px;
}

.rating {
  font-size: 22px;
  color: white;
  font-weight: 600;
}

/* Author & Title */
.title-author {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.author-style {
  font-size: 16px;
  color: rgb(150, 149, 149);
}

.title-style {
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

/* Price Section */
.price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.price-style {
  font-size: 16px;
  color: rgb(150, 149, 149);
  text-decoration: line-through;
  text-decoration-color: rgb(150, 149, 149);
}

.finalPrice-discount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.finalPrice-style {
  font-size: 20px;
  font-weight: bold;
  color: black;
}

.discount-style {
  font-size: 18px;
  font-weight: bolder;
  color: orange;
}
.button-btn {
  display: flex;
  align-items: center;
  justify-content: center; /* center icon + text horizontally */
  gap: 8px;
  padding: 10px 28px;
  background-color: #3255FB;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 40px;
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  cursor: pointer;
  margin-top: auto;
  transition: transform 0.3s ease, background-color 0.3s;
}

.button-btn:hover {
  background-color: #2643d6;
  transform: scale(1.1);
}

.button-btn svg {
  font-size: 18px;
}
</style>
