<template>
  <nav>
    <ul class="nav-list">
      <li>
        <router-link to="/Dashboard" class="nav-link" exact>Dashboard</router-link>
      </li>
      <li>
        <router-link to="/Subscription" class="nav-link">Subscription</router-link>
      </li>
      <li>
        <router-link to="/Genre" class="nav-link">Genres</router-link>
      </li>
      <li>
        <router-link to="/Book" class="nav-link">Books</router-link>
      </li>
      <li>
        <router-link to="/Promotion" class="nav-link">Promotion</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavigationComponent',
}
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
  transition:
    transform 0.2s ease,
    background-color 0.3s,
    color 0.1s;
}

.nav-link:hover {
  color: blue;
  transform: scale(1.2);
}

/* Active route */
.router-link-exact-active {
  background-color: #3255fb;
  color: white;
}
</style>
