<template>
  <div class="book" @click="handleClick">
    <div class="image-style">
      <img :src="image" alt="Book Image" />

      <span v-if="product.hasHotBadge" class="hot-badge">
        {{ product.hotBadgeText || '🔥 HOT' }}
      </span>
      <span v-if="product.hasBuy1Get1" class="bogo-badge"> Buy 1 Get 1 </span>

      <div class="heart-icon" :class="{ active: isWishlisted }" @click.stop="toggleWishlist">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          :fill="isWishlisted ? 'red' : 'none'"
          :stroke="isWishlisted ? 'red' : '#3255FB'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0 A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5 l-5.492 5.313a2 2 0 0 1-3 .019L5 15 c-1.5-1.5-3-3.2-3-5.5"
          />
        </svg>
      </div>
    </div>

    <div class="rating-box">
      <span class="star">★</span>
      <span class="rating">{{ rating }}</span>
    </div>

    <div class="title-author">
      <span class="author-style">{{ author }}</span>
      <span class="title-style">{{ title }}</span>
    </div>

    <div class="price-section">
      <span v-if="discount === 0" class="finalPrice-style"> ${{ price.toFixed(2) }} </span>

      <template v-else>
        <span class="price-style">${{ price.toFixed(2) }}</span>
        <div class="finalPrice-discount">
          <span class="finalPrice-style">${{ finalPrice.toFixed(2) }}</span>
          <span class="discount-style">
            {{
              product.discountType === 'percentage'
                ? `${discount}% Off`
                : `$${discount.toFixed(2)} Off`
            }}
          </span>
        </div>
      </template>
    </div>

    <button class="button-btn" @click.stop="handleAddToCart" :class="{ added: justAdded }">
      <template v-if="justAdded"> Added ✓ </template>
      <template v-else>
        Add To Cart
        <font-awesome-icon icon="shopping-cart" />
      </template>
    </button>
  </div>
</template>

<script>
import axios from 'axios'
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
      userId: null,
      isWishlisted: false,
      justAdded: false,
    }
  },
  mounted() {
    this.getUserId()
    this.checkWishlist()
  },
  methods: {
    handleClick() {
      this.$emit('book-clicked', this.product)
    },
    // Add to Cart with feedback animation
    handleAddToCart() {
      const cartStore = useCartStore()
      cartStore.addToCart(this.product)
      this.justAdded = true
      setTimeout(() => {
        this.justAdded = false
      }, 1500)
    },
    // Authentication & Wishlist Logic
    parseJwt(token) {
      try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        return JSON.parse(atob(base64))
      } catch {
        return null
      }
    },
    getUserId() {
      const token = sessionStorage.getItem('token')
      if (!token) return
      const payload = this.parseJwt(token)
      if (payload) this.userId = payload.sub
    },
    async checkWishlist() {
      if (!this.userId) return
      try {
        const res = await axios.get(`http://localhost:3000/wishlists/${this.userId}`)
        const productIds = res.data.map((item) => item.product.id)
        this.isWishlisted = productIds.includes(this.product.id)
      } catch (err) {
        console.error('Wishlist fetch error', err)
      }
    },
    async toggleWishlist() {
      if (!this.userId) {
        alert('Please login first to use wishlist')
        return
      }
      const previousState = this.isWishlisted
      this.isWishlisted = !this.isWishlisted
      try {
        if (this.isWishlisted) {
          await axios.post('http://localhost:3000/wishlists', {
            userId: this.userId,
            productIds: [this.product.id],
          })
        } else {
          await axios.delete(`http://localhost:3000/wishlists/${this.userId}/${this.product.id}`)
        }
      } catch (err) {
        console.error('Wishlist toggle error', err)
        this.isWishlisted = previousState // Rollback on error
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

.book {
  width: 267px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
}

.image-style {
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.image-style:hover {
  transform: scale(1.05);
}

.image-style img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Badges */
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
  z-index: 10;
}

.bogo-badge {
  position: absolute;
  top: 45px; /* Shifted down to avoid overlapping hot badge */
  left: 10px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 20px;
  z-index: 10;
}

/* Wishlist Icon */
.heart-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 11;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.heart-icon:hover {
  transform: scale(1.1);
}
.heart-icon.active svg {
  stroke: red;
  fill: red;
}

/* Rating */
.rating-box {
  width: 90px;
  height: 42px;
  background-color: #3255fb;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.star {
  color: yellow;
  font-size: 25px;
}
.rating {
  font-size: 22px;
  color: white;
  font-weight: 600;
}

/* Titles */
.title-author {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.author-style {
  font-size: 16px;
  color: #969595;
}
.title-style {
  font-size: 22px;
  font-weight: bold;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em;
}

/* Price */
.price-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.price-style {
  color: #969595;
  text-decoration: line-through;
}
.finalPrice-discount {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.finalPrice-style {
  font-size: 20px;
  font-weight: bold;
}
.discount-style {
  font-size: 18px;
  font-weight: 900;
  color: orange;
}

/* Button */
.button-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 28px;
  background-color: #3255fb;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 40px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-btn:hover {
  background-color: #2643d6;
  transform: scale(1.05);
}
.button-btn.added {
  background-color: #10b981;
}
</style>
