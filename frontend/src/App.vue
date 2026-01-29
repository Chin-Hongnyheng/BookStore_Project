<template>
  <div class="app">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<script lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
export default {
  name: 'App.vue',
  components: {
    HeaderComponent,
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0 1rem;
  overflow-x: hidden;
}
.app {
  width: 100%; /* Always equal to the screen width */
  min-height: 100vh; /* At least full screen height */
}
</style>
