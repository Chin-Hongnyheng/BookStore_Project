import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSubscriptionStore = defineStore('subscription', () => {
  const subscriptions = ref([
    {
      id: 1,
      userId: 'USR001',
      userName: 'John Doe',
      email: 'john@example.com',
      plan: 'Premium',
      startDate: '2025-12-01',
      endDate: '2026-12-01',
      amount: 9.99,
      status: 'Active',
    },
    {
      id: 2,
      userId: 'USR002',
      userName: 'Jane Smith',
      email: 'jane@example.com',
      plan: 'Basic',
      startDate: '2025-11-15',
      endDate: '2026-11-15',
      amount: 4.99,
      status: 'Active',
    },
    {
      id: 3,
      userId: 'USR003',
      userName: 'Bob Johnson',
      email: 'bob@example.com',
      plan: 'Premium',
      startDate: '2025-10-01',
      endDate: '2026-01-01',
      amount: 9.99,
      status: 'Expiring Soon',
    },
    {
      id: 4,
      userId: 'USR004',
      userName: 'Alice Brown',
      email: 'alice@example.com',
      plan: 'Premium',
      startDate: '2025-09-01',
      endDate: '2026-09-01',
      amount: 9.99,
      status: 'Active',
    },
    {
      id: 5,
      userId: 'USR005',
      userName: 'Charlie Davis',
      email: 'charlie@example.com',
      plan: 'Basic',
      startDate: '2025-08-10',
      endDate: '2026-01-10',
      amount: 4.99,
      status: 'Expired',
    },
  ])

  const plans = ref([
    { name: 'Basic', price: 4.99, description: 'Access to classic books' },
    { name: 'Premium', price: 9.99, description: 'Unlimited access to all books' },
    { name: 'VIP', price: 14.99, description: 'Premium + Early access to new releases' },
  ])

  const loading = ref(false)
  const error = ref(null)

  // Fetch subscriptions (currently uses static data as fallback)
  const fetchSubscriptions = async () => {
    loading.value = true
    error.value = null
    try {
      // Currently static data - replace with API call when backend is ready
      // const response = await fetch('http://localhost:3000/subscriptions')
      // subscriptions.value = await response.json()
      console.log('Subscriptions loaded (using static data)')
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch subscriptions:', err)
    } finally {
      loading.value = false
    }
  }

  const addSubscription = (subscription) => {
    subscription.id = Math.max(...subscriptions.value.map((s) => s.id), 0) + 1
    subscription.status = 'Active'
    subscriptions.value.push(subscription)
  }

  const updateSubscription = (id, updatedSubscription) => {
    const index = subscriptions.value.findIndex((s) => s.id === id)
    if (index !== -1) {
      subscriptions.value[index] = { ...subscriptions.value[index], ...updatedSubscription }
    }
  }

  const deleteSubscription = (id) => {
    subscriptions.value = subscriptions.value.filter((s) => s.id !== id)
  }

  const getActiveCount = () => {
    return subscriptions.value.filter((s) => s.status === 'Active').length
  }

  const getTotalRevenue = () => {
    return subscriptions.value
      .filter((s) => s.status === 'Active')
      .reduce((sum, s) => sum + s.amount, 0)
      .toFixed(2)
  }

  return {
    subscriptions,
    plans,
    loading,
    error,
    fetchSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getActiveCount,
    getTotalRevenue,
  }
})
