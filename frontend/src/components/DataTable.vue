<template>
  <div class="card">
    <div class="mb-4 flex items-center justify-between gap-4">
      <input v-model="searchQuery" type="text" placeholder="Search..." class="input-field flex-1" />
      <slot name="toolbar"></slot>
    </div>

    <div class="table-responsive">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 bg-gray-50">
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left text-sm font-semibold text-gray-700"
            >
              {{ column.label }}
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedItems"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <td v-for="column in columns" :key="column.key" class="px-6 py-4">
              <slot :name="`cell-${column.key}`" :item="item">
                {{ item[column.key] }}
              </slot>
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button
                  @click="$emit('edit', item)"
                  class="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Edit"
                >
                  <font-awesome-icon icon="edit" />
                </button>
                <button
                  @click="$emit('delete', item)"
                  class="text-red-600 hover:text-red-800 transition-colors"
                  title="Delete"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filteredItems.length === 0" class="text-center py-8 text-gray-500">
        No items found
      </div>
    </div>

    <div v-if="totalPages > 1" class="mt-4 flex items-center justify-between">
      <p class="text-sm text-gray-600">
        Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredItems.length) }} of
        {{ filteredItems.length }} items
      </p>
      <div class="flex gap-2">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="btn btn-secondary btn-sm disabled:opacity-50"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>
        <span class="flex items-center px-3">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="btn btn-secondary btn-sm disabled:opacity-50"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: Array,
  columns: Array,
  itemsPerPage: {
    type: Number,
    default: 10,
  },
})

defineEmits(['edit', 'delete'])

const searchQuery = ref('')
const currentPage = ref(1)

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items
  const query = searchQuery.value.toLowerCase()
  return props.items.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(query)),
  )
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / props.itemsPerPage))

const startIndex = computed(() => (currentPage.value - 1) * props.itemsPerPage)
const endIndex = computed(() => startIndex.value + props.itemsPerPage)

const paginatedItems = computed(() => filteredItems.value.slice(startIndex.value, endIndex.value))

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>
