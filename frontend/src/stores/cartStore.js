import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart_items') || '[]'))
  const coupon = ref(null)
  const discountAmount = ref(0)

  // Save to localStorage whenever items change
  const saveToStorage = () => {
    localStorage.setItem('cart_items', JSON.stringify(items.value))
  }

  // Add item to cart
  const addToCart = (product) => {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        author: product.author,
        image: product.image,
        price: Number(product.price),
        finalPrice: Number(product.finalPrice),
        discount: Number(product.discount),
        discountType: product.discountType || 'percentage',
        quantity: 1,
      })
    }
    saveToStorage()
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    items.value = items.value.filter((item) => item.id !== productId)
    saveToStorage()
  }

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    const item = items.value.find((i) => i.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveToStorage()
      }
    }
  }

  // Clear entire cart
  const clearCart = () => {
    items.value = []
    coupon.value = null
    discountAmount.value = 0
    saveToStorage()
  }

  // Apply coupon
  const applyCoupon = (couponData, discount) => {
    coupon.value = couponData
    discountAmount.value = discount
  }

  // Remove coupon
  const removeCoupon = () => {
    coupon.value = null
    discountAmount.value = 0
  }

  // Computed
  const cartCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0)
  })

  const totalAmount = computed(() => {
    return Math.max(0, subtotal.value - discountAmount.value)
  })

  return {
    items,
    coupon,
    discountAmount,
    cartCount,
    subtotal,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  }
})
