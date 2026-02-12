<template>
  <div class="checkout-page">
    <h1 class="page-title">Checkout</h1>

    <div v-if="orderSuccess" class="success-message">
      <div class="success-icon">✓</div>
      <h2>Order Placed Successfully!</h2>
      <p>Your order #{{ orderId }} has been submitted.</p>
      <p class="success-sub">We will review your payment and update the status shortly.</p>
      <router-link to="/Home" class="back-home-btn">Back to Home</router-link>
    </div>

    <div v-else class="checkout-content">
      <!-- Left: Form -->
      <div class="checkout-form-section">
        <!-- Customer Information -->
        <div class="form-card">
          <h2 class="card-title">Customer Information</h2>
          <div class="form-grid">
            <div class="form-group">
              <label>Full Name</label>
              <input v-model="form.customerName" type="text" placeholder="Enter your full name" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.customerEmail" type="email" placeholder="Enter your email" />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input
                v-model="form.customerPhone"
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>
            <div class="form-group full-width">
              <label>Address</label>
              <textarea
                v-model="form.customerAddress"
                rows="3"
                placeholder="Enter your delivery address"
              ></textarea>
            </div>
            <div class="form-group full-width">
              <label>Telegram Notification <span class="optional-tag">(optional)</span></label>
              <div class="telegram-connect">
                <!-- Option 1: Auto deep-link -->
                <div class="tg-option">
                  <div class="tg-option-header">
                    <span class="tg-option-num">1</span>
                    <span class="tg-option-title">Auto Connect</span>
                  </div>
                  <div
                    v-if="telegramConnected && !manualOverride"
                    class="telegram-status connected"
                  >
                    <span class="tg-icon">✅</span>
                    <span>Telegram connected! Notifications will be sent to your account.</span>
                    <button class="tg-change-btn" @click="manualOverride = true">
                      Use different ID
                    </button>
                  </div>
                  <template v-else-if="!manualOverride">
                    <a
                      :href="telegramDeepLink"
                      target="_blank"
                      class="telegram-btn"
                      @click="onTelegramClick"
                    >
                      <span class="tg-icon">✈️</span>
                      Get Telegram Notification
                    </a>
                    <p v-if="telegramChecking" class="field-hint">Checking connection...</p>
                    <p v-else class="field-hint">
                      Click to connect your Telegram and receive order updates
                    </p>
                  </template>
                  <div v-else class="telegram-status overridden">
                    <span class="tg-icon">ℹ️</span>
                    <span>Using manual Chat ID below instead.</span>
                    <button
                      class="tg-change-btn"
                      @click="
                        manualOverride = false
                        manualChatId = ''
                      "
                    >
                      Use auto connect
                    </button>
                  </div>
                </div>

                <div class="tg-divider"><span>OR</span></div>

                <!-- Option 2: Manual Chat ID -->
                <div class="tg-option">
                  <div class="tg-option-header">
                    <span class="tg-option-num">2</span>
                    <span class="tg-option-title">Enter Chat ID Manually</span>
                  </div>
                  <input
                    v-model="manualChatId"
                    type="text"
                    placeholder="e.g. 123456789"
                    @input="onManualInput"
                  />
                  <p class="field-hint">
                    Send /start to <strong>@userinfobot</strong> on Telegram to get your Chat ID
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="form-card">
          <h2 class="card-title">Payment Method</h2>
          <div class="payment-option active">
            <div class="payment-header">
              <div class="payment-radio active"></div>
              <span class="payment-label">Bank QR Code Payment</span>
            </div>
            <div class="payment-body">
              <div class="qr-section">
                <div class="qr-image-box">
                  <img src="../../assets/QrCode.jpg" alt="QR Code" class="qr-image" />
                </div>
                <div class="qr-info">
                  <div class="form-group">
                    <label>Bank Name</label>
                    <select v-model="form.bankName" class="bank-select">
                      <option value="">Select Your Bank</option>
                      <option value="ABA">ABA Bank</option>
                      <option value="ACLEDA">ACLEDA Bank</option>
                      <option value="Wing">Wing Bank</option>
                      <option value="Canadia">Canadia Bank</option>
                      <option value="KHQR">KHQR</option>
                    </select>
                  </div>
                  <div class="payment-instructions">
                    <h4>Payment Instructions:</h4>
                    <ol>
                      <li>Open your banking app</li>
                      <li>Scan the QR code above</li>
                      <li>
                        Transfer the exact amount:
                        <strong>${{ cartStore.totalAmount.toFixed(2) }}</strong>
                      </li>
                      <li>Take a screenshot of the payment</li>
                      <li>Upload the screenshot below</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div class="upload-section">
                <label class="upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    @change="handlePaymentImage"
                    class="upload-input"
                  />
                  <div class="upload-box" :class="{ 'has-file': paymentPreview }">
                    <template v-if="!paymentPreview">
                      <font-awesome-icon icon="download" class="upload-icon" />
                      <span>Upload Payment Screenshot</span>
                    </template>
                    <template v-else>
                      <img :src="paymentPreview" alt="Payment" class="upload-preview" />
                      <span class="upload-change">Change Image</span>
                    </template>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Order Summary -->
      <div class="order-summary">
        <h2 class="card-title">Order Summary</h2>

        <div class="summary-items">
          <div v-for="item in cartStore.items" :key="item.id" class="summary-item">
            <img
              :src="'http://localhost:3000/uploads/products/' + item.image"
              :alt="item.title"
              class="summary-item-img"
            />
            <div class="summary-item-info">
              <span class="summary-item-title">{{ item.title }}</span>
              <span class="summary-item-qty">Qty: {{ item.quantity }}</span>
            </div>
            <span class="summary-item-price"
              >${{ (item.finalPrice * item.quantity).toFixed(2) }}</span
            >
          </div>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>
        <div v-if="cartStore.discountAmount > 0" class="summary-row discount">
          <span>Discount ({{ cartStore.coupon?.code }})</span>
          <span>-${{ cartStore.discountAmount.toFixed(2) }}</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row total">
          <span>Total</span>
          <span>${{ cartStore.totalAmount.toFixed(2) }}</span>
        </div>

        <button @click="placeOrder" class="place-order-btn" :disabled="submitting">
          {{ submitting ? 'Placing Order...' : 'Confirm Payment' }}
        </button>

        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { orderApi } from '@/services/orderApi'
import axios from 'axios'

const cartStore = useCartStore()
const submitting = ref(false)
const orderSuccess = ref(false)
const orderId = ref(null)
const errorMsg = ref('')
const paymentFile = ref(null)
const paymentPreview = ref(null)

/* ─── Telegram deep-link ─── */
const userId = sessionStorage.getItem('userId')
const telegramDeepLink = `https://t.me/Boundora_Bot?start=${userId}`
const telegramConnected = ref(false)
const telegramChecking = ref(false)
const manualOverride = ref(false)
const manualChatId = ref('')
let telegramPollTimer = null

const checkTelegramStatus = async () => {
  if (!userId) return
  try {
    const { data } = await axios.get(`http://localhost:3000/telegram/status/${userId}`)
    telegramConnected.value = data.connected
    if (data.connected && telegramPollTimer) {
      clearInterval(telegramPollTimer)
      telegramPollTimer = null
      telegramChecking.value = false
    }
  } catch {
    /* ignore */
  }
}

const onTelegramClick = () => {
  telegramChecking.value = true
  manualOverride.value = false
  manualChatId.value = ''
  // Start polling after user clicks the deep-link button
  if (!telegramPollTimer) {
    telegramPollTimer = setInterval(checkTelegramStatus, 3000)
  }
}

const onManualInput = () => {
  if (manualChatId.value.trim()) {
    manualOverride.value = true
  }
}

onMounted(() => {
  // Check once on mount in case user already connected before
  checkTelegramStatus()
})

onUnmounted(() => {
  if (telegramPollTimer) {
    clearInterval(telegramPollTimer)
    telegramPollTimer = null
  }
})

const form = reactive({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  customerAddress: '',
  bankName: '',
})

const handlePaymentImage = (e) => {
  const file = e.target.files[0]
  if (file) {
    paymentFile.value = file
    paymentPreview.value = URL.createObjectURL(file)
  }
}

const placeOrder = async () => {
  // Validation
  if (
    !form.customerName.trim() ||
    !form.customerEmail.trim() ||
    !form.customerPhone.trim() ||
    !form.customerAddress.trim()
  ) {
    errorMsg.value = 'Please fill in all customer information fields.'
    return
  }
  if (!form.bankName) {
    errorMsg.value = 'Please select a bank.'
    return
  }
  if (!paymentFile.value) {
    errorMsg.value = 'Please upload your payment screenshot.'
    return
  }
  if (cartStore.items.length === 0) {
    errorMsg.value = 'Your cart is empty.'
    return
  }

  submitting.value = true
  errorMsg.value = ''

  try {
    const orderData = {
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      customerAddress: form.customerAddress,
      items: cartStore.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.finalPrice,
      })),
      couponCode: cartStore.coupon?.code || null,
      discountAmount: cartStore.discountAmount || 0,
      paymentMethod: 'BANK_QR',
      bankName: form.bankName,
      telegramChatId:
        manualOverride.value && manualChatId.value.trim() ? manualChatId.value.trim() : null,
      userId: !manualOverride.value ? userId || null : null,
    }

    const result = await orderApi.createOrder(orderData, paymentFile.value)
    orderId.value = result.id
    orderSuccess.value = true
    cartStore.clearCart()
  } catch (err) {
    errorMsg.value = err.message || 'Failed to place order. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

.checkout-page {
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

/* Success */
.success-message {
  text-align: center;
  padding: 80px 20px;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #10b981;
  color: white;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.success-message h2 {
  font-size: 28px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.success-message p {
  font-size: 17px;
  color: #374151;
}

.success-sub {
  color: #6b7280 !important;
  font-size: 15px !important;
  margin-top: 8px;
}

.back-home-btn {
  display: inline-block;
  margin-top: 24px;
  background: #3255fb;
  color: white;
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}

.back-home-btn:hover {
  background: #1a3a8f;
}

/* Checkout Layout */
.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  align-items: flex-start;
}

.checkout-form-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Form Card */
.form-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.card-title {
  font-size: 20px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Nunito', sans-serif;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #3255fb;
  box-shadow: 0 0 0 3px rgba(50, 85, 251, 0.1);
}

.optional-tag {
  font-size: 12px;
  font-weight: 400;
  color: #9ca3af;
}

.field-hint {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}

/* Payment */
.payment-option {
  border: 2px solid #3255fb;
  border-radius: 12px;
  padding: 20px;
}

.payment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.payment-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
}

.payment-radio.active {
  border-color: #3255fb;
  background: #3255fb;
  box-shadow: inset 0 0 0 3px white;
}

.payment-label {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
}

.qr-section {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
}

.qr-image-box {
  flex-shrink: 0;
}

.qr-image {
  width: 180px;
  height: 180px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
}

.qr-info {
  flex: 1;
}

.bank-select {
  width: 100%;
}

.payment-instructions {
  margin-top: 14px;
}

.payment-instructions h4 {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
}

.payment-instructions ol {
  padding-left: 20px;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.8;
}

.payment-instructions strong {
  color: #3255fb;
}

/* Upload */
.upload-section {
  margin-top: 12px;
}

.upload-input {
  display: none;
}

.upload-label {
  cursor: pointer;
}

.upload-box {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.upload-box:hover {
  border-color: #3255fb;
  background: #f8f9ff;
}

.upload-box.has-file {
  border-color: #10b981;
  background: #f0fdf4;
  padding: 12px;
}

.upload-icon {
  font-size: 28px;
  color: #9ca3af;
}

.upload-preview {
  max-height: 150px;
  border-radius: 8px;
  object-fit: contain;
}

.upload-change {
  font-size: 12px;
  color: #10b981;
  font-weight: 700;
}

/* Order Summary */
.order-summary {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  position: sticky;
  top: 24px;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.summary-item-img {
  width: 48px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
}

.summary-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.summary-item-title {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-item-qty {
  font-size: 12px;
  color: #6b7280;
}

.summary-item-price {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
}

.summary-divider {
  border-top: 1px solid #e5e7eb;
  margin: 12px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  color: #374151;
  margin-bottom: 8px;
}

.summary-row.discount span:last-child {
  color: #10b981;
  font-weight: 700;
}

.summary-row.total {
  font-size: 20px;
  font-weight: 800;
  color: #1a1a2e;
}

/* Place Order Button */
.place-order-btn {
  width: 100%;
  padding: 14px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.2s;
  font-family: 'Nunito', sans-serif;
}

.place-order-btn:hover {
  background: #059669;
}

.place-order-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.error-msg {
  color: #ef4444;
  font-size: 14px;
  margin-top: 12px;
  text-align: center;
}

/* Responsive */
@media (max-width: 900px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
  .order-summary {
    position: static;
  }
  .qr-section {
    flex-direction: column;
    align-items: center;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
}

/* Telegram Connect */
.telegram-connect {
  margin-top: 4px;
}

.telegram-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0088cc;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
  font-family: 'Nunito', sans-serif;
}

.telegram-btn:hover {
  background: #006da3;
}

.telegram-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}

.telegram-status.connected {
  background: #f0fdf4;
  color: #059669;
  border: 1px solid #bbf7d0;
  flex-wrap: wrap;
}

.telegram-status.overridden {
  background: #f0f4ff;
  color: #3255fb;
  border: 1px solid #c7d2fe;
  flex-wrap: wrap;
}

.tg-icon {
  font-size: 18px;
}

.tg-option {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tg-option-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tg-option-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #3255fb;
  color: white;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tg-option-title {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.tg-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 700;
}

.tg-divider::before,
.tg-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.tg-change-btn {
  background: none;
  border: none;
  color: #3255fb;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-left: auto;
  font-family: 'Nunito', sans-serif;
}

.tg-change-btn:hover {
  color: #1a3a8f;
}
</style>
