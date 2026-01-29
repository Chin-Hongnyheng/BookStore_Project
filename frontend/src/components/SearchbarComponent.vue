<template>
  <div class="search-bar">
    <input type="text" placeholder="Search for items" />
    <button @click="search">
      <font-awesome-icon icon="magnifying-glass" style="font-size: 16px" />
      Search
    </button>
  </div>
</template>
<script>
export default {
  name: 'SearchbarComponent',
}
</script>
<style scoped>
.search-bar {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 527px;
  height: 44px;
  border: 1px solid rgb(191, 191, 192);
  border-radius: 40px;
  /* Any part of the input, button, or content that sticks outside the rounded box will be cut off */
  overflow: hidden;
}
.search-bar input {
  /* fill whole space */
  flex: 1;
  border: none;
  padding: 0 16px;
  outline: none;
  font-size: 16px;
  font-family: 'Nunito';
}
.search-bar button {
  background-color: #3255fb;
  color: white;
  border: none;
  border-radius: 40px 0 0 40px;
  padding: 0 16px;
  height: 100%;
  width: 104px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-family: 'Nunito';
  font-size: 15px;
  font-weight: bold;
  transition: background-color 03s;
}
.search-bar button:hover {
  background-color: #2643d6;
}
</style>
