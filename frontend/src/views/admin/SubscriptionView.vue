<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Manage Subscriptions</h2>
        <p class="text-gray-600 mt-1">View and manage all user subscriptions</p>
      </div>
      <button @click="openAddModal" class="btn btn-primary">
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Subscription
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card">
        <p class="text-sm text-gray-600">Active Subscriptions</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">
          {{ subscriptionStore.getActiveCount() }}
        </p>
      </div>
      <div class="card">
        <p class="text-sm text-gray-600">Monthly Revenue</p>
        <p class="text-3xl font-bold text-green-600 mt-2">
          ${{ subscriptionStore.getTotalRevenue() }}
        </p>
      </div>
      <div class="card">
        <p class="text-sm text-gray-600">Total Subscribers</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">
          {{ subscriptionStore.subscriptions.length }}
        </p>
      </div>
    </div>

    <!-- Subscriptions Table -->
    <DataTable
      :items="subscriptionStore.subscriptions"
      :columns="[
        { key: 'id', label: 'ID' },
        { key: 'userName', label: 'User Name' },
        { key: 'email', label: 'Email' },
        { key: 'plan', label: 'Plan' },
        { key: 'amount', label: 'Amount' },
        { key: 'status', label: 'Status' },
        { key: 'endDate', label: 'End Date' },
      ]"
      @edit="editSubscription"
      @delete="deleteSubscription"
    >
      <template #cell-amount="{ item }"> ${{ item.amount.toFixed(2) }} </template>
      <template #cell-status="{ item }">
        <span
          :class="[
            'badge',
            item.status === 'Active'
              ? 'badge-success'
              : item.status === 'Expiring Soon'
                ? 'badge-warning'
                : 'badge-danger',
          ]"
        >
          {{ item.status }}
        </span>
      </template>
    </DataTable>

    <!-- Add/Edit Modal -->
    <Modal
      v-if="showModal"
      :title="isEditing ? 'Edit Subscription' : 'Add New Subscription'"
      @close="closeModal"
      @submit="submitForm"
    >
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="userName" class="label">User Name</label>
            <input
              id="userName"
              v-model="formData.userName"
              type="text"
              class="input-field"
              required
              placeholder="Enter user name"
            />
          </div>

          <div class="form-group">
            <label for="email" class="label">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="input-field"
              required
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="userId" class="label">User ID</label>
          <input
            id="userId"
            v-model="formData.userId"
            type="text"
            class="input-field"
            required
            placeholder="e.g., USR001"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="plan" class="label">Plan Type</label>
            <select v-model="formData.plan" class="input-field" required @change="updateAmount">
              <option value="">Select a plan</option>
              <option v-for="plan in subscriptionStore.plans" :key="plan.name" :value="plan.name">
                {{ plan.name }} - ${{ plan.price }}/month
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="amount" class="label">Amount ($)</label>
            <input
              id="amount"
              v-model.number="formData.amount"
              type="number"
              class="input-field"
              step="0.01"
              required
              placeholder="0.00"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="startDate" class="label">Start Date</label>
            <input
              id="startDate"
              v-model="formData.startDate"
              type="date"
              class="input-field"
              required
            />
          </div>

          <div class="form-group">
            <label for="endDate" class="label">End Date</label>
            <input
              id="endDate"
              v-model="formData.endDate"
              type="date"
              class="input-field"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="status" class="label">Status</label>
          <select v-model="formData.status" class="input-field" required>
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import DataTable from '@/components/admin/DataTable.vue'
import Modal from '@/components/admin/Modal.vue'

const route = useRoute()
const subscriptionStore = useSubscriptionStore()

const showModal = ref(false)
const isEditing = ref(false)
const currentSubscriptionId = ref(null)

const formData = reactive({
  userId: '',
  userName: '',
  email: '',
  plan: '',
  startDate: '',
  endDate: '',
  amount: 0,
  status: 'Active',
})

// Fetch subscriptions when component mounts
onMounted(async () => {
  await subscriptionStore.fetchSubscriptions()
})

// Reload data when route changes (navigating to this view)
watch(
  () => route.path,
  async () => {
    if (route.path === '/admin/subscriptions') {
      await subscriptionStore.fetchSubscriptions()
    }
  },
)

const openAddModal = () => {
  isEditing.value = false
  currentSubscriptionId.value = null
  resetForm()
  showModal.value = true
}

const editSubscription = (subscription) => {
  isEditing.value = true
  currentSubscriptionId.value = subscription.id
  formData.userId = subscription.userId
  formData.userName = subscription.userName
  formData.email = subscription.email
  formData.plan = subscription.plan
  formData.startDate = subscription.startDate
  formData.endDate = subscription.endDate
  formData.amount = subscription.amount
  formData.status = subscription.status
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  formData.userId = ''
  formData.userName = ''
  formData.email = ''
  formData.plan = ''
  formData.startDate = ''
  formData.endDate = ''
  formData.amount = 0
  formData.status = 'Active'
}

const updateAmount = () => {
  const plan = subscriptionStore.plans.find((p) => p.name === formData.plan)
  if (plan) {
    formData.amount = plan.price
  }
}

const submitForm = () => {
  if (
    !formData.userId.trim() ||
    !formData.userName.trim() ||
    !formData.email.trim() ||
    !formData.plan ||
    !formData.startDate ||
    !formData.endDate ||
    formData.amount === 0
  ) {
    alert('Please fill in all required fields')
    return
  }

  if (new Date(formData.startDate) > new Date(formData.endDate)) {
    alert('Start date must be before end date')
    return
  }

  if (isEditing.value) {
    subscriptionStore.updateSubscription(currentSubscriptionId.value, {
      userId: formData.userId,
      userName: formData.userName,
      email: formData.email,
      plan: formData.plan,
      startDate: formData.startDate,
      endDate: formData.endDate,
      amount: formData.amount,
      status: formData.status,
    })
  } else {
    subscriptionStore.addSubscription({
      userId: formData.userId,
      userName: formData.userName,
      email: formData.email,
      plan: formData.plan,
      startDate: formData.startDate,
      endDate: formData.endDate,
      amount: formData.amount,
    })
  }

  closeModal()
}

const deleteSubscription = (subscription) => {
  if (confirm(`Are you sure you want to delete the subscription for "${subscription.userName}"?`)) {
    subscriptionStore.deleteSubscription(subscription.id)
  }
}
</script>
