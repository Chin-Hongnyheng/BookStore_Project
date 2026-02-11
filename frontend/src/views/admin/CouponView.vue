<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Manage Coupons</h2>
        <p class="text-gray-600 mt-1">Create and manage discount coupon codes</p>
      </div>
      <button @click="openAddModal" class="btn btn-primary">
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Coupon
      </button>
    </div>

    <!-- Coupons Table -->
    <DataTable
      :items="couponStore.coupons"
      :columns="[
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Name' },
        { key: 'discountType', label: 'Type' },
        { key: 'discountValue', label: 'Discount' },
        { key: 'usageCount', label: 'Used' },
        { key: 'isActive', label: 'Status' },
      ]"
      @edit="editCoupon"
      @delete="deleteCoupon"
    >
      <template #cell-code="{ item }">
        <span class="font-mono font-bold text-indigo-600">{{ item.code }}</span>
      </template>
      <template #cell-discountType="{ item }">
        <span :class="item.discountType === 'percentage' ? 'text-blue-600' : 'text-green-600'">
          {{ item.discountType === 'percentage' ? 'Percentage' : 'Fixed Amount' }}
        </span>
      </template>
      <template #cell-discountValue="{ item }">
        <template v-if="item.discountType === 'percentage'">
          {{ Number(item.discountValue).toFixed(0) }}%
        </template>
        <template v-else>
          ${{ Number(item.discountValue).toFixed(2) }}
        </template>
      </template>
      <template #cell-usageCount="{ item }">
        {{ item.usageCount }} / {{ item.usageLimit === -1 ? '∞' : item.usageLimit }}
      </template>
      <template #cell-isActive="{ item }">
        <span
          :class="[
            'badge',
            item.isActive ? 'badge-success' : 'badge-danger',
          ]"
        >
          {{ item.isActive ? 'Active' : 'Inactive' }}
        </span>
        <span v-if="item.isFirstTimeOnly" class="badge badge-warning ml-1">
          First-time Only
        </span>
      </template>
    </DataTable>

    <!-- Add/Edit Modal -->
    <Modal
      v-if="showModal"
      :title="isEditing ? 'Edit Coupon' : 'Add New Coupon'"
      @close="closeModal"
      @submit="submitForm"
    >
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="code" class="label">Coupon Code</label>
            <input
              id="code"
              v-model="formData.code"
              type="text"
              class="input-field font-mono uppercase"
              required
              placeholder="e.g., SUMMER20"
              maxlength="20"
            />
          </div>

          <div class="form-group">
            <label for="name" class="label">Coupon Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="input-field"
              required
              placeholder="e.g., Summer Sale Coupon"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="discountType" class="label">Discount Type</label>
            <select v-model="formData.discountType" class="input-field" required>
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount ($)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="discountValue" class="label">
              Discount {{ formData.discountType === 'percentage' ? '(%)' : '($)' }}
            </label>
            <input
              id="discountValue"
              v-model.number="formData.discountValue"
              type="number"
              class="input-field"
              step="0.01"
              required
              placeholder="Enter discount amount"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="minimumPurchase" class="label">Minimum Purchase ($)</label>
            <input
              id="minimumPurchase"
              v-model.number="formData.minimumPurchase"
              type="number"
              class="input-field"
              step="0.01"
              placeholder="0 = no minimum"
            />
          </div>

          <div class="form-group" v-if="formData.discountType === 'percentage'">
            <label for="maximumDiscount" class="label">Maximum Discount Cap ($)</label>
            <input
              id="maximumDiscount"
              v-model.number="formData.maximumDiscount"
              type="number"
              class="input-field"
              step="0.01"
              placeholder="Leave empty for no cap"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="usageLimit" class="label">Total Usage Limit</label>
            <input
              id="usageLimit"
              v-model.number="formData.usageLimit"
              type="number"
              class="input-field"
              placeholder="-1 = unlimited"
            />
          </div>

          <div class="form-group">
            <label for="usageLimitPerUser" class="label">Per User Limit</label>
            <input
              id="usageLimitPerUser"
              v-model.number="formData.usageLimitPerUser"
              type="number"
              class="input-field"
              min="1"
              placeholder="1"
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

        <div class="flex gap-6">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              v-model="formData.isActive"
              class="w-4 h-4"
            />
            <span class="text-sm">Active</span>
          </label>

          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              v-model="formData.isFirstTimeOnly"
              class="w-4 h-4"
            />
            <span class="text-sm">First-time Users Only</span>
          </label>
        </div>

        <div class="form-group">
          <label for="description" class="label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="input-field"
            rows="2"
            placeholder="Enter coupon description"
          ></textarea>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCouponStore } from '@/stores/couponStore'
import DataTable from '@/components/admin/DataTable.vue'
import Modal from '@/components/admin/Modal.vue'

const route = useRoute()
const couponStore = useCouponStore()

const showModal = ref(false)
const isEditing = ref(false)
const currentCouponId = ref(null)

const formData = reactive({
  code: '',
  name: '',
  discountType: 'percentage',
  discountValue: 0,
  minimumPurchase: 0,
  maximumDiscount: null,
  usageLimit: -1,
  usageLimitPerUser: 1,
  startDate: '',
  endDate: '',
  isActive: true,
  isFirstTimeOnly: false,
  description: '',
})

// Fetch coupons when component mounts
onMounted(async () => {
  await couponStore.fetchCoupons()
})

// Reload data when route changes
watch(
  () => route.path,
  async () => {
    if (route.path === '/admin/coupons') {
      await couponStore.fetchCoupons()
    }
  },
)

const openAddModal = () => {
  isEditing.value = false
  currentCouponId.value = null
  resetForm()
  showModal.value = true
}

const editCoupon = (coupon) => {
  isEditing.value = true
  currentCouponId.value = coupon.id
  formData.code = coupon.code
  formData.name = coupon.name
  formData.discountType = coupon.discountType
  formData.discountValue = Number(coupon.discountValue)
  formData.minimumPurchase = Number(coupon.minimumPurchase) || 0
  formData.maximumDiscount = coupon.maximumDiscount ? Number(coupon.maximumDiscount) : null
  formData.usageLimit = coupon.usageLimit
  formData.usageLimitPerUser = coupon.usageLimitPerUser
  formData.startDate = coupon.startDate
  formData.endDate = coupon.endDate
  formData.isActive = coupon.isActive
  formData.isFirstTimeOnly = coupon.isFirstTimeOnly
  formData.description = coupon.description || ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  formData.code = ''
  formData.name = ''
  formData.discountType = 'percentage'
  formData.discountValue = 0
  formData.minimumPurchase = 0
  formData.maximumDiscount = null
  formData.usageLimit = -1
  formData.usageLimitPerUser = 1
  formData.startDate = ''
  formData.endDate = ''
  formData.isActive = true
  formData.isFirstTimeOnly = false
  formData.description = ''
}

const submitForm = async () => {
  if (!formData.code.trim() || !formData.name.trim() || !formData.startDate || !formData.endDate) {
    alert('Please fill in all required fields')
    return
  }

  if (formData.discountValue <= 0) {
    alert('Please enter a valid discount amount')
    return
  }

  if (new Date(formData.startDate) > new Date(formData.endDate)) {
    alert('Start date must be before end date')
    return
  }

  try {
    const couponData = {
      code: formData.code.toUpperCase(),
      name: formData.name,
      discountType: formData.discountType,
      discountValue: formData.discountValue,
      minimumPurchase: formData.minimumPurchase || 0,
      maximumDiscount: formData.maximumDiscount || null,
      usageLimit: formData.usageLimit,
      usageLimitPerUser: formData.usageLimitPerUser,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isActive: formData.isActive,
      isFirstTimeOnly: formData.isFirstTimeOnly,
      description: formData.description,
    }

    if (isEditing.value) {
      await couponStore.updateCoupon(currentCouponId.value, couponData)
    } else {
      await couponStore.addCoupon(couponData)
    }

    closeModal()
  } catch (err) {
    alert(err.message || 'Failed to save coupon')
  }
}

const deleteCoupon = async (coupon) => {
  if (confirm(`Are you sure you want to delete coupon "${coupon.code}"?`)) {
    try {
      await couponStore.deleteCoupon(coupon.id)
    } catch (err) {
      alert(err.message || 'Failed to delete coupon')
    }
  }
}
</script>
