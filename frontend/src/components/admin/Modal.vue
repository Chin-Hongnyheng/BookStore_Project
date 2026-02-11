<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[95vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <font-awesome-icon icon="times" class="text-lg" />
        </button>
      </div>
      <div class="p-6">
        <slot></slot>
      </div>
      <div v-if="showFooter" class="flex gap-3 p-6 border-t border-gray-200 justify-end">
        <button @click="$emit('close')" class="btn btn-secondary">Cancel</button>
        <button @click="$emit('submit')" class="btn btn-primary">
          {{ submitButtonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  showFooter: {
    type: Boolean,
    default: true,
  },
  submitButtonLabel: {
    type: String,
    default: 'Submit',
  },
})

defineEmits(['close', 'submit'])
</script>
