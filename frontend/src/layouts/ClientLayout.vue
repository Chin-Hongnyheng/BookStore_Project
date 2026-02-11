<template>
  <div class="app">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import HeaderComponent from '@/components/client/HeaderComponent.vue'
import FooterComponent from '@/components/client/FooterComponent.vue'

export default {
  name: 'ClientLayout',
  components: {
    HeaderComponent,
    FooterComponent,
  },
}
</script>

<style scoped>
.app {
  width: 100%;
  min-height: 100vh;
}
</style>
