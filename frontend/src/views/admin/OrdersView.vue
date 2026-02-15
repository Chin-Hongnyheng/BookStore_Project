<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Manage Orders</h2>
        <p class="text-gray-600 mt-1">View and manage customer orders</p>
      </div>
      <div class="flex items-center gap-3">
        <select
          v-model="statusFilter"
          class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Orders</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12 text-gray-500">Loading orders...</div>

    <!-- Empty State -->
    <div v-else-if="filteredOrders.length === 0" class="text-center py-12">
      <font-awesome-icon icon="clipboard-list" class="text-5xl text-gray-300 mb-4" />
      <p class="text-gray-500 text-lg">No orders found</p>
    </div>

    <!-- Orders List -->
    <div v-else class="space-y-4">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <!-- Order Header -->
        <div
          class="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200"
        >
          <div class="flex items-center gap-4">
            <span class="text-sm font-bold text-gray-900">Order #{{ order.id }}</span>
            <span
              :class="statusClass(order.status)"
              class="px-3 py-1 rounded-full text-xs font-bold uppercase"
            >
              {{ order.status }}
            </span>
          </div>
          <span class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</span>
        </div>

        <!-- Order Body -->
        <div class="p-6">
          <div class="grid grid-cols-3 gap-6">
            <!-- Customer Info -->
            <div>
              <h4 class="text-sm font-bold text-gray-700 mb-2">Customer Information</h4>
              <div class="space-y-1 text-sm text-gray-600">
                <p><span class="font-medium">Name:</span> {{ order.customerName }}</p>
                <p><span class="font-medium">Email:</span> {{ order.customerEmail }}</p>
                <p><span class="font-medium">Phone:</span> {{ order.customerPhone }}</p>
                <p><span class="font-medium">Address:</span> {{ order.customerAddress }}</p>
              </div>
            </div>

            <!-- Order Items -->
            <div>
              <h4 class="text-sm font-bold text-gray-700 mb-2">Items Ordered</h4>
              <div class="space-y-2 max-h-32 overflow-y-auto">
                <div
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex items-center gap-2 text-sm"
                >
                  <img
                    v-if="item.product"
                    :src="`${API_BASE_URL}/uploads/products/${item.product.image}`"
                    class="w-8 h-10 object-cover rounded"
                    :alt="item.product?.title"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-800 truncate">
                      {{ item.product?.title || 'Unknown Product' }}
                    </p>
                    <p class="text-gray-500">
                      {{ item.quantity }} × ${{ Number(item.unitPrice).toFixed(2) }}
                    </p>
                  </div>
                  <span class="font-medium">${{ Number(item.totalPrice).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Payment & Total -->
            <div>
              <h4 class="text-sm font-bold text-gray-700 mb-2">Payment Details</h4>
              <div class="space-y-1 text-sm text-gray-600">
                <p><span class="font-medium">Bank:</span> {{ order.bankName || 'N/A' }}</p>
                <p><span class="font-medium">Method:</span> {{ order.paymentMethod || 'N/A' }}</p>
                <div class="border-t border-gray-100 mt-2 pt-2 space-y-1">
                  <p>
                    <span class="font-medium">Subtotal:</span> ${{
                      Number(order.subtotal).toFixed(2)
                    }}
                  </p>
                  <p v-if="Number(order.discountAmount) > 0" class="text-green-600">
                    <span class="font-medium">Discount:</span> -${{
                      Number(order.discountAmount).toFixed(2)
                    }}
                    <span v-if="order.couponCode" class="text-xs">({{ order.couponCode }})</span>
                  </p>
                  <p class="text-lg font-bold text-gray-900">
                    Total: ${{ Number(order.totalAmount).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Screenshot -->
          <div v-if="order.paymentImage" class="mt-4 pt-4 border-t border-gray-100">
            <h4 class="text-sm font-bold text-gray-700 mb-2">Payment Screenshot</h4>
            <img
              :src="`${API_BASE_URL}/uploads/payments/${order.paymentImage}`"
              class="max-h-48 rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
              @click="openImage(order.paymentImage)"
              alt="Payment Screenshot"
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              v-if="order.status === 'PENDING' || order.status === 'PAID'"
              @click="updateStatus(order.id, 'CONFIRMED')"
              class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <font-awesome-icon icon="check" class="mr-1" /> Confirm Order
            </button>
            <button
              v-if="order.status === 'PENDING' || order.status === 'PAID'"
              @click="updateStatus(order.id, 'REJECTED')"
              class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <font-awesome-icon icon="times" class="mr-1" /> Reject Order
            </button>
            <button
              @click="deleteOrder(order.id)"
              class="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors ml-auto"
            >
              <font-awesome-icon icon="trash" class="mr-1" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="showImageModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      @click="showImageModal = false"
    >
      <div class="max-w-2xl max-h-[80vh]" @click.stop>
        <img
          :src="`${API_BASE_URL}/uploads/payments/${selectedImage}`"
          class="max-h-[80vh] rounded-lg"
          alt="Payment Screenshot"
        />
        <button
          @click="showImageModal = false"
          class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { orderApi } from '@/services/orderApi'

const orders = ref([])
const loading = ref(true)
const statusFilter = ref('')
const showImageModal = ref(false)
const selectedImage = ref('')
const API_BASE_URL = import.meta.env.VITE_API_BASE

const filteredOrders = computed(() => {
  if (!statusFilter.value) return orders.value
  return orders.value.filter((o) => o.status === statusFilter.value)
})

const statusClass = (status) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'PAID':
      return 'bg-blue-100 text-blue-800'
    case 'CONFIRMED':
      return 'bg-green-100 text-green-800'
    case 'REJECTED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const openImage = (image) => {
  selectedImage.value = image
  showImageModal.value = true
}

const fetchOrders = async () => {
  loading.value = true
  try {
    orders.value = await orderApi.getAllOrders()
  } catch (err) {
    console.error('Failed to fetch orders:', err)
  } finally {
    loading.value = false
  }
}

const updateStatus = async (id, status) => {
  try {
    await orderApi.updateOrderStatus(id, status)
    await fetchOrders()
  } catch (err) {
    console.error('Failed to update order status:', err)
  }
}

const deleteOrder = async (id) => {
  if (!confirm('Are you sure you want to delete this order?')) return
  try {
    await orderApi.deleteOrder(id)
    await fetchOrders()
  } catch (err) {
    console.error('Failed to delete order:', err)
  }
}

onMounted(fetchOrders)
</script>
