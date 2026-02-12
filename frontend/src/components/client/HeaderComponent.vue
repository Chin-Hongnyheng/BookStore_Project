<template>
  <div class="header">
    <img :src="logo" class="logo" />
    <NavigationComponent />
    <SearchbarComponent />
    <div class="icon-style">
      <FontAwesomeIcon :icon="farHeart" class="icon" />
      <router-link to="/Cart" class="cart-icon-wrapper">
        <font-awesome-icon icon="shopping-cart" class="icon" />
        <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
      </router-link>
      <FontAwesomeIcon :icon="farCircleUser" class="icon" />
    </div>
  </div>
</template>
<script>
import NavigationComponent from './NavigationComponent.vue'
import SearchbarComponent from './SearchbarComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faCircleUser as farCircleUser } from '@fortawesome/free-regular-svg-icons'
import logo from '@/assets/logo.png'
import { useCartStore } from '@/stores/cartStore'
import { computed } from 'vue'

export default {
  name: 'HeaderComponent',
  components: {
    NavigationComponent,
    SearchbarComponent,
    FontAwesomeIcon,
  },
  setup() {
    const cartStore = useCartStore()
    const cartCount = computed(() => cartStore.cartCount)
    return { cartCount }
  },
  data() {
    return {
      farHeart,
      farCircleUser,
      logo,
    }
  },
}
</script>
<style scoped>
.icon-style {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
}
.icon {
  font-size: 35px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}
.icon:hover {
  color: #3255fb;
  transform: scale(1.2);
}
.cart-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: #ef4444;
  color: white;
  font-size: 12px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  font-family: 'Nunito', sans-serif;
}
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
}
.logo {
  width: 150px;
  height: 150px;
}
</style>
