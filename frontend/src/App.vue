<template>
  <div class="app">
  <HeaderComponent />
  <!-- dynamic view -->
  <!-- router-view-> index.js -> redirect to Homeview -> check Route if have /HomeView? -> Render the Content -->
  <router-view />
  <FooterComponent />
  </div>
</template>

<script lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App.vue',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
.app {
  width: 100vw;      /* Always equal to the screen width */
  min-height: 100vh; /* At least full screen height */
}
</style>
