<template>
  <div>
    <div v-if="showChart" class="card h-80">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">{{ title }}</h3>
      <svg viewBox="0 0 500 300" class="w-full h-full">
        <!-- Bar Chart -->
        <template v-if="type === 'bar'">
          <g>
            <!-- Y-axis -->
            <line x1="50" y1="20" x2="50" y2="250" stroke="#e5e7eb" stroke-width="2" />
            <!-- X-axis -->
            <line x1="50" y1="250" x2="480" y2="250" stroke="#e5e7eb" stroke-width="2" />

            <g v-for="(item, index) in data" :key="index">
              <!-- Bar -->
              <rect
                :x="60 + index * 60"
                :y="250 - (item.value / maxValue) * 200"
                width="40"
                height="(item.value / maxValue) * 200"
                :fill="`hsl(${index * 50}, 70%, 60%)`"
              />
              <!-- Label -->
              <text :x="80 + index * 60" y="270" text-anchor="middle" font-size="12" fill="#6b7280">
                {{ item.label }}
              </text>
              <!-- Value -->
              <text
                :x="80 + index * 60"
                :y="240 - (item.value / maxValue) * 200"
                text-anchor="middle"
                font-size="11"
                fill="#374151"
                font-weight="bold"
              >
                {{ item.value }}
              </text>
            </g>
          </g>
        </template>

        <!-- Line Chart -->
        <template v-if="type === 'line'">
          <g>
            <!-- Grid -->
            <line x1="50" y1="20" x2="50" y2="250" stroke="#e5e7eb" stroke-width="2" />
            <line x1="50" y1="250" x2="480" y2="250" stroke="#e5e7eb" stroke-width="2" />

            <!-- Points and Line -->
            <polyline :points="pointsString" fill="none" stroke="#3b82f6" stroke-width="2" />

            <!-- Data Points -->
            <g v-for="(item, index) in data" :key="index">
              <circle
                :cx="60 + index * (400 / (data.length - 1))"
                :cy="250 - (item.value / maxValue) * 200"
                r="4"
                fill="#3b82f6"
              />
              <!-- Label -->
              <text
                :x="60 + index * (400 / (data.length - 1))"
                y="270"
                text-anchor="middle"
                font-size="12"
                fill="#6b7280"
              >
                {{ item.label }}
              </text>
            </g>
          </g>
        </template>

        <!-- Pie Chart -->
        <template v-if="type === 'pie'">
          <g>
            <g v-for="(slice, index) in slices" :key="index">
              <path
                :d="slice.path"
                :fill="`hsl(${index * 60}, 70%, 60%)`"
                stroke="white"
                stroke-width="2"
              />
            </g>
            <!-- Legend -->
            <g v-for="(item, index) in data" :key="index">
              <rect
                :x="320"
                :y="30 + index * 25"
                width="15"
                height="15"
                :fill="`hsl(${index * 60}, 70%, 60%)`"
              />
              <text :x="345" :y="42 + index * 25" font-size="12" fill="#374151">
                {{ item.label }} ({{ item.value }})
              </text>
            </g>
          </g>
        </template>
      </svg>
    </div>
    <div v-else class="card flex items-center justify-center h-80">
      <p class="text-gray-500">Chart data not available</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    enum: ['bar', 'line', 'pie'],
    default: 'bar',
  },
  data: {
    type: Array,
    default: () => [],
  },
  title: String,
})

const showChart = computed(() => props.data && props.data.length > 0)

const maxValue = computed(() => {
  if (!props.data || props.data.length === 0) return 1
  return Math.max(...props.data.map((item) => item.value))
})

const pointsString = computed(() => {
  if (props.data.length === 0) return ''
  return props.data
    .map((item, index) => {
      const x = 60 + index * (400 / (props.data.length - 1))
      const y = 250 - (item.value / maxValue.value) * 200
      return `${x},${y}`
    })
    .join(' ')
})

const slices = computed(() => {
  const sliceList = []
  let currentAngle = -Math.PI / 2
  const total = props.data.reduce((sum, item) => sum + item.value, 0)

  props.data.forEach((item) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle
    const largeArc = sliceAngle > Math.PI ? 1 : 0

    const x1 = 250 + 80 * Math.cos(startAngle)
    const y1 = 150 + 80 * Math.sin(startAngle)
    const x2 = 250 + 80 * Math.cos(endAngle)
    const y2 = 150 + 80 * Math.sin(endAngle)

    const path = `M 250 150 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`

    sliceList.push({ path })
    currentAngle = endAngle
  })

  return sliceList
})
</script>
