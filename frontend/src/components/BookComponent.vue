<template>
  <div class="book" @click="handleClick">
    <!-- Book Image -->
    <div class="image-style">
      <img :src="image" alt="Book Image" />

      <!-- HEART -->
      <div
        class="heart-icon"
        :class="{ active: isWishlisted }"
        @click.stop="toggleWishlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0
               A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5
               l-5.492 5.313a2 2 0 0 1-3 .019L5 15
               c-1.5-1.5-3-3.2-3-5.5"/>
        </svg>
      </div>
    </div>

    <!-- Rating -->
    <div class="rating-box">
      <span class="star">★</span>
      <span class="rating">{{ rating }}</span>
    </div>

    <!-- Author & Title -->
    <div class="title-author">
      <span class="author-style">{{ author }}</span>
      <span class="title-style">{{ title }}</span>
    </div>

    <!-- Price -->
    <div class="price-section">
      <span v-if="discount === 0" class="finalPrice-style">
        ${{ price.toFixed(2) }}
      </span>

      <template v-else>
        <span class="price-style">${{ price.toFixed(2) }}</span>
        <div class="finalPrice-discount">
          <span class="finalPrice-style">${{ finalPrice.toFixed(2) }}</span>
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
import axios from 'axios'
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
        const res = await axios.get(
          `http://localhost:3000/wishlists/${this.userId}`
        )

        const productIds = res.data.map(item => item.product.id)
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

      this.isWishlisted = !this.isWishlisted

      try {
        if (this.isWishlisted) {
          await axios.post('http://localhost:3000/wishlists', {
            userId: this.userId,
            productIds: [this.product.id],
          })
        } else {
          await axios.delete(
            `http://localhost:3000/wishlists/${this.userId}/${this.product.id}`
          )
        }
      } catch (err) {
        console.error('Wishlist error', err)
        this.isWishlisted = !this.isWishlisted
      }
    },
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');
.heart-icon.active svg {
  stroke: red;
}
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
  border-radius: 20px;
  object-position: center;
}
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
  transition: transform 0.2s ease, background-color 0.2s ease;
  z-index: 10;
}

.heart-icon:hover {
  transform: scale(1.1);
  background-color: #f2f2f2;
}

.heart-icon svg {
  width: 24px;
  height: 24px;
  stroke: #3255FB; 
}

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
