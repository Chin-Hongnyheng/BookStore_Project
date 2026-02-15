const API_BASE_URL = import.meta.env.VITE_API_BASE

export const orderApi = {
  // Create a new order (with payment image upload)
  async createOrder(orderData, paymentImageFile = null) {
    const formData = new FormData()
    formData.append('customerName', orderData.customerName)
    formData.append('customerEmail', orderData.customerEmail)
    formData.append('customerPhone', orderData.customerPhone)
    formData.append('customerAddress', orderData.customerAddress)
    formData.append('items', JSON.stringify(orderData.items))
    if (orderData.couponCode) formData.append('couponCode', orderData.couponCode)
    if (orderData.discountAmount)
      formData.append('discountAmount', String(orderData.discountAmount))
    if (orderData.paymentMethod) formData.append('paymentMethod', orderData.paymentMethod)
    if (orderData.bankName) formData.append('bankName', orderData.bankName)
    if (orderData.telegramChatId) formData.append('telegramChatId', orderData.telegramChatId)
    if (orderData.userId) formData.append('userId', orderData.userId)
    if (paymentImageFile) formData.append('paymentImage', paymentImageFile)

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) throw new Error(`Failed to create order: ${response.statusText}`)
    return response.json()
  },

  // Get all orders
  async getAllOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`)
    if (!response.ok) throw new Error(`Failed to fetch orders: ${response.statusText}`)
    return response.json()
  },

  // Get a single order
  async getOrder(id) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch order: ${response.statusText}`)
    return response.json()
  },

  // Update order status (admin)
  async updateOrderStatus(id, status) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) throw new Error(`Failed to update order status: ${response.statusText}`)
    return response.json()
  },

  // Upload payment screenshot
  async uploadPayment(id, paymentImageFile) {
    const formData = new FormData()
    formData.append('paymentImage', paymentImageFile)
    const response = await fetch(`${API_BASE_URL}/orders/${id}/payment`, {
      method: 'PATCH',
      body: formData,
    })
    if (!response.ok) throw new Error(`Failed to upload payment: ${response.statusText}`)
    return response.json()
  },

  // Validate coupon
  async validateCoupon(code, cartTotal) {
    const response = await fetch(
      `${API_BASE_URL}/coupons/validate?code=${encodeURIComponent(code)}&cartTotal=${cartTotal}`,
    )
    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.message || 'Invalid coupon')
    }
    return response.json()
  },

  // Delete an order
  async deleteOrder(id) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error(`Failed to delete order: ${response.statusText}`)
  },
}
