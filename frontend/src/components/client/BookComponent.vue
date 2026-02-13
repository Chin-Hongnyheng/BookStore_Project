<template>
  <div class="book" @click="handleClick">
    <!-- Book Image -->
    <div class="image-style">
      <img :src="image" alt="Book Image" />
      <!-- Hot Badge -->
      <span v-if="product.hasHotBadge" class="hot-badge">
        {{ product.hotBadgeText || '🔥 HOT' }}
      </span>
      <!-- Buy 1 Get 1 Badge -->
      <span v-if="product.hasBuy1Get1" class="bogo-badge"> Buy 1 Get 1 </span>
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
      <span v-if="discount === 0" class="finalPrice-style"> ${{ price.toFixed(2) }} </span>

      <!-- WITH DISCOUNT -->
      <template v-else>
        <span class="price-style">${{ price.toFixed(2) }}</span>
        <div class="finalPrice-discount">
          <span class="finalPrice-style"> ${{ finalPrice.toFixed(2) }} </span>
          <span class="discount-style" v-if="product.discountType === 'percentage'">
            {{ discount }}% Off
          </span>
          <span class="discount-style" v-else> ${{ discount.toFixed(2) }} Off </span>
        </div>
      </template>
    </div>

    <button class="button-btn" @click="handleAddToCart" :class="{ added: justAdded }">
      <template v-if="justAdded"> Added ✓ </template>
      <template v-else>
        Add To Cart
        <font-awesome-icon icon="shopping-cart" />
      </template>
    </button>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'

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
  data() {
    return {
      justAdded: false,
    }
  },
  methods: {
    handleAddToCart() {
      const cartStore = useCartStore()
      cartStore.addToCart(this.product)
      this.justAdded = true
      setTimeout(() => {
        this.justAdded = false
      }, 1500)
    },
  },
  methods: {
    handleClick() {
      this.$emit('book-clicked', this.product)
    },
  },
}
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
  position: relative;
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

/* Hot Badge */
.hot-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(135deg, #ff6b35, #f72626);
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.4);
  z-index: 10;
}

/* Buy 1 Get 1 Badge */
.bogo-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
  z-index: 10;
}

/* Rating Box */
.rating-box {
  width: 90px;
  height: 42px;
  background-color: #3255fb;
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
  background-color: #3255fb;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 40px;
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  cursor: pointer;
  margin-top: auto;
  transition:
    transform 0.3s ease,
    background-color 0.3s;
}

.button-btn:hover {
  background-color: #2643d6;
  transform: scale(1.1);
}

.button-btn.added {
  background-color: #10b981;
  transform: scale(1.05);
}

.button-btn svg {
  font-size: 18px;
}
</style>
