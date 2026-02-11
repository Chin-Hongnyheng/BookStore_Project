<template>
  <nav>
    <ul class="nav-list">
      <li v-for="item in filterNavItems" :key="item.path">
        <router-link
        :to="item.path"
        class="nav-link"
        active-class="router-link-exact-active"
        >
      {{ item.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>


<script setup lang="ts">
import { computed } from 'vue'

const navItems = [
  {
    path: '/Home',
    title: 'Home',
    roles: ['User'],
  },
  {
    path: '/Explore',
    title: 'Explore',
    roles: ['User'],
  },
  {
    path: '/New-Arrivals',
    title: 'New Arrivals',
    roles: ['User'],
  },
  {
    path: '/Best-Selling-Books',
    title: 'Best Selling Books',
    roles: ['User'],
  },
  {
    path: '/Contact-Us',
    title: 'Contact Us',
    roles: ['User'],
  },
]
//Get roles from sessionStorage
const rawRoles: string[] = JSON.parse(
  sessionStorage.getItem('roles') || '[]'
)
// Store userRole in array
const userRoles = rawRoles.map(r => r.toLowerCase())

//Filer Item and detect role
const filterNavItems = computed(() =>
  navItems.filter((item) => 
  item.roles.some((role) => userRoles.includes(role.toLowerCase()))
)
);
</script>
<style scoped>

.nav-list {
  display: flex;             
  align-items: center;
  justify-content: center;
  gap: 20px;                
  list-style: none;           
  padding: 20px;
  margin: 30px;
}

.nav-link {
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Nunito';
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  color: black;
  transition: transform 0.2s ease,background-color 0.3s, color 0.1s;
}

.nav-link:hover {
  color: blue;
  transform: scale(1.2);
}

/* Active route */
.router-link-exact-active {
  background-color: #3255FB;
  color: white;
}


</style>