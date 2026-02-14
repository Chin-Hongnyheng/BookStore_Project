<template>
  <div class="book-page-container" v-if="book">
    <div class="book-card">
      
      <div class="left-group">
        <div class="column cover-col">
           <div class="cover-wrapper">
            <img
            :src="'http://localhost:3000/uploads/products/' + book.image"
            class="book-image"
            />
            </div>
        </div>

        <div class="column meta-col">
          <div class="meta-item">
            <p class="label-text">Published:</p>
            <p class="value-text bold">{{ formatDate(book.published) }}</p>
          </div>

          <div class="genre-grid">
            <span v-for="genre in book.genres || []" :key="genre.id" class="genre-badge">
              {{ genre.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="column details-col">
        <div class="header-section">
          <h1 class="main-title">{{ book.title }}</h1>
          <p class="author-name">By {{ book.author }}</p>
        </div>

        <div class="stats-row">
          <div class="stat-box">
            <span class="stat-label">Pages</span>
            <span class="stat-value">{{ book.pages }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Language</span>
            <span class="stat-value">{{ book.language }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Ratings</span>
            <span class="stat-value">{{ book.rating }}</span>
          </div>
        </div>

        <div class="description-section">
          <h3 class="desc-title">Descriptions</h3>
          <p class="desc-text">
            {{ book.description }}
          </p>
        </div>

        <div class="action-row">
          <div class="price-container">
            <p class="price-label">Price</p>
            <p class="price-value">${{ (book.discount > 0 ? book.finalPrice : book.price).toFixed(2) }}</p>
          </div>
          
          <button class="add-to-cart" @click.stop="handleAddToCart" :class="{ added: justAdded }">
            <template v-if="justAdded"> Added ✓ </template>
            <template v-else>
              Add To Cart
              <font-awesome-icon icon="shopping-cart" />
            </template>
          </button>
          
          <div
            class="wishlist-icon"
            :class="{ active: isWishlisted }"
            @click.stop="toggleWishlist"
          >
            <FontAwesomeIcon
              :icon="farHeart"
            />
          </div>

        </div>
      </div>

    </div>
  </div>

  <div class="loading-state" v-else>
    Loading book...
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBookStore } from '@/stores/BookData'
import { useCartStore } from '@/stores/cartStore'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

export default {
  name: 'BookView',
  components: { FontAwesomeIcon },

  setup() {
    const route = useRoute()
    const bookStore = useBookStore()
    const cartStore = useCartStore()

    const book = ref<any>(null)
    const justAdded = ref(false)
    const isWishlisted = ref(false)
    const userId = ref<number | null>(null)

    // -----------------------------
    // LOAD BOOK
    // -----------------------------
    const loadBook = async () => {
      const id = Number(route.params.id)

      if (!bookStore.products.length) {
        await bookStore.fetchProducts()
      }

      book.value =
        bookStore.discountedProducts.find(p => Number(p.id) === id) || null

      if (book.value) {
        await checkWishlist()
      }
    }

    // -----------------------------
    // ADD TO CART
    // -----------------------------
    const handleAddToCart = () => {
      if (!book.value) return

      cartStore.addToCart(book.value)

      justAdded.value = true
      setTimeout(() => {
        justAdded.value = false
      }, 1500)
    }

    // -----------------------------
    // JWT PARSE
    // -----------------------------
    const parseJwt = (token: string) => {
      try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        return JSON.parse(atob(base64))
      } catch {
        return null
      }
    }

    const getUserId = () => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      const payload = parseJwt(token)
      if (payload) {
        userId.value = payload.sub
      }
    }

    // -----------------------------
    // CHECK WISHLIST
    // -----------------------------
    const checkWishlist = async () => {
      if (!userId.value || !book.value) return

      try {
        const res = await axios.get(
          `http://localhost:3000/wishlists/${userId.value}`
        )

        const productIds = res.data.map((item: any) => item.product.id)

        isWishlisted.value = productIds.includes(book.value.id)
      } catch (err) {
        console.error('Wishlist fetch error', err)
      }
    }

    // -----------------------------
    // TOGGLE WISHLIST
    // -----------------------------
    const toggleWishlist = async () => {
      if (!userId.value) {
        alert('Please login first')
        return
      }

      if (!book.value) return

      const previousState = isWishlisted.value
      isWishlisted.value = !isWishlisted.value

      try {
        if (isWishlisted.value) {
          await axios.post('http://localhost:3000/wishlists', {
            userId: userId.value,
            productIds: [book.value.id],
          })
        } else {
          await axios.delete(
            `http://localhost:3000/wishlists/${userId.value}/${book.value.id}`
          )
        }
      } catch (err) {
        console.error('Wishlist toggle error', err)
        isWishlisted.value = previousState
        alert('Failed to update wishlist.')
      }
    }

    // -----------------------------
    // FORMAT DATE
    // -----------------------------
    const formatDate = (dateStr: string) => {
      if (!dateStr) return 'N/A'
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }

    // -----------------------------
    // LIFECYCLE
    // -----------------------------
    onMounted(() => {
      getUserId()
      loadBook()
    })

    watch(() => route.params.id, loadBook)

    return {
      book,
      formatDate,
      handleAddToCart,
      toggleWishlist,
      justAdded,
      isWishlisted,
      farHeart,
    }
  },
}
</script>


<style scoped>
.book-page-container {
  font-family: 'Nunito', sans-serif;
  background-color: #EFF3FF;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  padding: 30px;
}

.book-card {
  display: flex;
  max-width: 1300px;
  width: 100%;
  align-items: center;
  justify-content: center; 
  gap: 100px; 
}

.left-group {
  display: flex;
  align-items: center;
  gap: 50px; 
  margin-right: 0; 
}

.column { display: flex; flex-direction: column; }

.book-image {
  width: 100%;
  height: 100%;
  object-fit: cover;   /* fills container, crops excess */
  object-position: center;
  display: block;
}
.cover-wrapper {
  width: 100%;
  height: 450px;        /* 2:3 book ratio */
  border-radius: 20px;
  overflow: hidden;    /* crop overflow */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}


/* 2. Meta */
.meta-col { width: 180px; gap: 40px; }
.label-text { color: #8a8a8a; margin: 0; font-size: 1.5rem; }
.value-text { color: #333; margin: 5px 0; font-size: 1.1rem; }
.bold { font-weight: 700; }

.genre-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.genre-badge {
  background-color: #DDE2F0;
  border-radius: 8px;
  padding: 10px 0;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
}

/* 3. Details Section */
.details-col { flex: 1; }
.header-section { text-align: center; margin-bottom: 30px; }
.main-title { font-size: 3.5rem; font-weight: 900; margin: 0; letter-spacing: -1px; }
.author-name { color: #666; font-size: 1.1rem; margin-top: 5px; }

.stats-row {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 30px;
}
.stat-box { text-align: center; }
.stat-label { display: block; color: #8a8a8a; font-size: 1.1rem; margin-bottom: 5px; }
.stat-value { font-weight: 800; font-size: 1.2rem; }

.description-section { margin-bottom: 40px; }
.desc-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; }
.desc-text { color: #777; line-height: 1.6; font-size: 1.05rem; }
.read-more { color: #3366FF; cursor: pointer; font-weight: 600; margin-left: 4px; }

/* Action Area */
.action-row {
  display: flex;
  align-items: center;
  gap: 25px;
}
.price-label { color: #333; font-size: 1.5rem; margin: 0; }
.price-value { font-size: 2.2rem; font-weight: 900; margin: 0; color: #000; }

.add-to-cart {
  background-color: #3b66f5;
  color: white;
  border: none;
  padding: 18px 0;
  flex: 1;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transition: all 0.3s ease;
}
.add-to-cart.added {
  background: #10b981;
}

.add-to-cart:hover {
  transform: scale(1.02);
}

.wishlist-icon {
  font-size: 45px;
  border: 2.5px solid #000;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}
.wishlist-icon.active {
  border-color: red;
  color: red;
}
.wishlist-icon:hover {
  transform: scale(1.1)
}
</style>