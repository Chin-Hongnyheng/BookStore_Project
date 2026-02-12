<template>
  <div class="cart-page">
    <h1 class="page-title">Shopping Cart</h1>

    <!-- Empty Cart -->
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <font-awesome-icon icon="shopping-cart" class="empty-icon" />
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added any books yet.</p>
      <router-link to="/Explore" class="browse-btn">Browse Books</router-link>
    </div>

    <!-- Cart Content -->
    <div v-else class="cart-content">
      <!-- Cart Items -->
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <img
            :src="'http://localhost:3000/uploads/products/' + item.image"
            :alt="item.title"
            class="item-image"
          />
          <div class="item-details">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-author">by {{ item.author }}</p>
            <div class="item-price-row">
              <span v-if="item.discount > 0" class="item-original-price">
                ${{ item.price.toFixed(2) }}
              </span>
              <span class="item-price">${{ item.finalPrice.toFixed(2) }}</span>
            </div>
          </div>
          <div class="item-quantity">
            <button class="qty-btn" @click="decreaseQty(item.id)">−</button>
            <span class="qty-value">{{ item.quantity }}</span>
            <button class="qty-btn" @click="increaseQty(item.id)">+</button>
          </div>
          <div class="item-subtotal">${{ (item.finalPrice * item.quantity).toFixed(2) }}</div>
          <button class="remove-btn" @click="cartStore.removeFromCart(item.id)">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <h2 class="summary-title">Order Summary</h2>

        <div class="summary-row">
          <span>Subtotal ({{ cartStore.cartCount }} items)</span>
          <span>${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>

        <!-- Coupon Input -->
        <div class="coupon-section">
          <div v-if="!cartStore.coupon" class="coupon-input-row">
            <input
              v-model="couponCode"
              type="text"
              placeholder="Enter coupon code"
              class="coupon-input"
              @keyup.enter="applyCoupon"
            />
            <button @click="applyCoupon" class="coupon-btn" :disabled="couponLoading">
              {{ couponLoading ? 'Validating...' : 'Apply' }}
            </button>
          </div>
          <div v-else class="coupon-applied">
            <div class="coupon-tag">
              <font-awesome-icon icon="tag" />
              <span>{{ cartStore.coupon.code }}</span>
              <button @click="removeCoupon" class="coupon-remove">×</button>
            </div>
          </div>
          <p v-if="couponError" class="coupon-error">{{ couponError }}</p>
        </div>

        <div v-if="cartStore.discountAmount > 0" class="summary-row discount-row">
          <span>Discount</span>
          <span class="discount-amount">-${{ cartStore.discountAmount.toFixed(2) }}</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row total-row">
          <span>Total</span>
          <span>${{ cartStore.totalAmount.toFixed(2) }}</span>
        </div>

        <router-link to="/Checkout" class="checkout-btn">
          Proceed to Checkout
          <font-awesome-icon icon="arrow-right" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { orderApi } from '@/services/orderApi'

const cartStore = useCartStore()
const couponCode = ref('')
const couponLoading = ref(false)
const couponError = ref('')

const increaseQty = (id) => {
  const item = cartStore.items.find((i) => i.id === id)
  if (item) cartStore.updateQuantity(id, item.quantity + 1)
}

const decreaseQty = (id) => {
  const item = cartStore.items.find((i) => i.id === id)
  if (item && item.quantity > 1) cartStore.updateQuantity(id, item.quantity - 1)
}

const applyCoupon = async () => {
  if (!couponCode.value.trim()) return
  couponLoading.value = true
  couponError.value = ''
  try {
    const result = await orderApi.validateCoupon(couponCode.value, cartStore.subtotal)
    cartStore.applyCoupon(result.coupon, result.discountAmount)
    couponCode.value = ''
  } catch (err) {
    couponError.value = err.message
  } finally {
    couponLoading.value = false
  }
}

const removeCoupon = () => {
  cartStore.removeCoupon()
  couponCode.value = ''
  couponError.value = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  font-family: 'Nunito', sans-serif;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 32px;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  color: #d1d5db;
  margin-bottom: 20px;
}

.empty-cart h2 {
  font-size: 24px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
}

.empty-cart p {
  color: #6b7280;
  margin-bottom: 24px;
}

.browse-btn {
  display: inline-block;
  background: #3255fb;
  color: white;
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}

.browse-btn:hover {
  background: #1a3a8f;
}

/* Cart Content */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: flex-start;
}

/* Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.item-image {
  width: 80px;
  height: 110px;
  object-fit: cover;
  border-radius: 10px;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-author {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
}

.item-price-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-original-price {
  font-size: 13px;
  color: #9ca3af;
  text-decoration: line-through;
}

.item-price {
  font-size: 16px;
  font-weight: 700;
  color: #3255fb;
}

/* Quantity */
.item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f3f4f6;
  border-radius: 10px;
  padding: 4px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: white;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  color: #374151;
}

.qty-btn:hover {
  background: #e5e7eb;
}

.qty-value {
  font-size: 16px;
  font-weight: 700;
  min-width: 24px;
  text-align: center;
  color: #1a1a2e;
}

.item-subtotal {
  font-size: 17px;
  font-weight: 800;
  color: #1a1a2e;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.remove-btn:hover {
  background: #fee2e2;
}

/* Cart Summary */
.cart-summary {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  position: sticky;
  top: 24px;
}

.summary-title {
  font-size: 20px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #374151;
  margin-bottom: 12px;
}

.discount-row .discount-amount {
  color: #10b981;
  font-weight: 700;
}

.summary-divider {
  border-top: 2px solid #e5e7eb;
  margin: 16px 0;
}

.total-row {
  font-size: 20px;
  font-weight: 800;
  color: #1a1a2e;
}

/* Coupon */
.coupon-section {
  margin: 16px 0;
}

.coupon-input-row {
  display: flex;
  gap: 8px;
}

.coupon-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  outline: none;
}

.coupon-input:focus {
  border-color: #3255fb;
  box-shadow: 0 0 0 3px rgba(50, 85, 251, 0.1);
}

.coupon-btn {
  background: #3255fb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Nunito', sans-serif;
}

.coupon-btn:hover {
  background: #1a3a8f;
}

.coupon-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.coupon-applied {
  display: flex;
  align-items: center;
}

.coupon-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #eef2ff;
  color: #3255fb;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
}

.coupon-remove {
  background: none;
  border: none;
  color: #3255fb;
  font-size: 18px;
  cursor: pointer;
  padding: 0 2px;
  font-weight: 700;
}

.coupon-error {
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
}

/* Checkout Button */
.checkout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  background: #3255fb;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
  transition: background 0.2s;
  font-family: 'Nunito', sans-serif;
}

.checkout-btn:hover {
  background: #1a3a8f;
}

/* Responsive */
@media (max-width: 900px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  .cart-summary {
    position: static;
  }
}
</style>
