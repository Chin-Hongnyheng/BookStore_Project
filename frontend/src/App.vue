<template>
  <div v-if="showLayout" class="app">
    <HeaderComponent />
    <!-- dynamic view -->
    <!-- router-view-> index.js -> redirect to Homeview -> check Route if have /HomeView? -> Render the Content -->
    <router-view />
    <FooterComponent />
  </div>
  <router-view v-else/>
</template>

<script lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
  name: 'App.vue',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup(){
    const route = useRoute()
  
    //Condition to show layout
    const showLayout = computed(() => {
      return route.path != '/login' && route.path != '/register'
    })

    return{
      showLayout,
    }
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Nunito';
}

.app {
  width: 100%;
  min-height: 100vh;
}
</style>
  