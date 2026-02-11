<template>
  <div class="card">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold text-gray-700">{{ title }}</h3>
      <font-awesome-icon :icon="icon" class="text-3xl" :class="iconColor" />
    </div>
    <p class="text-3xl font-bold text-gray-900 mb-2">{{ value }}</p>
    <p class="text-sm text-gray-500">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  subtitle: String,
  icon: String,
  iconColor: {
    type: String,
    default: 'text-blue-500',
  },
})
</script>
