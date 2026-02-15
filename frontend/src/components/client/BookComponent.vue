<template>
  <div class="book" @click="handleClick">
    <div class="image-style" @click="$emit('book-clicked', product)">
      <img :src="image" alt="Book Image" />

      <div class="promo-container">
        <!-- Hot Badge -->
        <span v-if="product.hasHotBadge" class="hot-badge">
          {{ product.hotBadgeText || '🔥 HOT' }}
        </span>
        <!-- Buy 1 Get 1 Badge -->
        <span v-if="product.hasBuy1Get1" class="bogo-badge"> Buy 1 Get 1 </span>
      </div>

      <div class="heart-icon" :class="{ active: isWishlisted }" @click.stop="toggleWishlist">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          :fill="isWishlisted ? '#f72626' : 'none'"
          :stroke="isWishlisted ? '#f72626' : 'white'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0
               A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5
               l-5.492 5.313a2 2 0 0 1-3 .019L5 15
               c-1.5-1.5-3-3.2-3-5.5"
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
          <span class="finalPrice-style"> ${{ finalPrice.toFixed(2) }} </span>
          <span class="discount-style">
            {{ product.discountType === 'percentage' ? discount + '%' : '$' + discount.toFixed(2) }}
            Off
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
import { useCartStore } from '@/stores/cartStore'
import axios from 'axios' // ← ADD THIS IMPORT

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
      userId: null,
      isWishlisted: false,
    }
  },
  mounted() {
    this.getUserId()
    this.checkWishlist()
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
    handleClick() {
      this.$emit('book-clicked', this.product)
    },
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
      if (payload) {
        this.userId = payload.sub
      }
    },
    async checkWishlist() {
      if (!this.userId) return

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/wishlists/${this.userId}`)
        const productIds = res.data.map((item) => item.product.id)
        this.isWishlisted = productIds.includes(this.product.id)
      } catch (err) {
        console.error('Wishlist fetch error', err)
      }
    },

    async toggleWishlist() {
      if (!this.userId) {
        alert('Please login first')
        return
      }

      const previousState = this.isWishlisted 
      this.isWishlisted = !this.isWishlisted

      try {
        if (this.isWishlisted) {
          await axios.post(`${import.meta.env.VITE_API_BASE}/wishlists`, {
            userId: this.userId,
            productIds: [this.product.id],
          })
        } else {
          await axios.delete(`${import.meta.env.VITE_API_BASE}/wishlists/${this.userId}/${this.product.id}`)
        }
      } catch (err) {
        console.error('Wishlist toggle error', err)
        this.isWishlisted = previousState // Rollback on error
        alert('Failed to update wishlist. Please try again.')
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

.book {
  width: 267px;
  height: 700px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Nunito', sans-serif;
  overflow: hidden;
}

.image-style {
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-color: #f0f0f0;
}

.image-style img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-style:hover img {
  transform: scale(1.1);
}

.promo-container {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 10;
}

.hot-badge,
.bogo-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 8px;
  color: white;
  width: fit-content;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.hot-badge {
  background: linear-gradient(135deg, #ff6b35, #f72626);
}

.bogo-badge {
  background: linear-gradient(135deg, #10b981, #059669);
}

/* Wishlist Heart on the Top Right */
.heart-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.heart-icon:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.1);
}

.heart-icon.active {
  background: white;
}

.rating-box {
  width: 75px;
  height: 35px;
  background-color: #3255fb;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.star {
  color: #ffd700;
  font-size: 18px;
}
.rating {
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.title-author {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.author-style {
  font-size: 14px;
  color: #888;
}
.title-style {
  font-size: 18px;
  font-weight: 800;
  min-height: 2.6em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-section {
  min-height: 45px; 
  display: flex;
  flex-direction: column;
  justify-content: flex-end; 
}

.price-style {
  text-decoration: line-through;
  color: #bbb;
  font-size: 14px;
  line-height: 1;
  margin-bottom: 2px;
  display: block; 
}

.finalPrice-discount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 28px;
}
.finalPrice-style {
  font-size: 20px;
  font-weight: 900;
}
.discount-style {
  color: #ff9800;
  font-weight: 800;
}

.button-btn {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #3255fb;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.button-btn:hover {
  background: #1a3bc7;
}
.button-btn.added {
  background: #10b981;
}
</style>
