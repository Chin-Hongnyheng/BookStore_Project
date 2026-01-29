<template>
  <div class="dashboard">
    <!-- Stats -->
    <div class="stats">
      <div class="stat-card" v-for="stat in stats" :key="stat.title">
        <p class="stat-title">{{ stat.title }}</p>
        <h3>{{ stat.value }}</h3>
        <span :class="stat.trend > 0 ? 'up' : 'down'">
          {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
        </span>
      </div>
    </div>

    <!-- Table Header -->
    <div class="table-header">
      <h3>All Products</h3>
      <div class="actions">
        <input type="text" placeholder="Search item..." />
        <button class="primary">+ Add New Book</button>
      </div>
    </div>

    <!-- Table -->
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Product</th>
          <th>Product ID</th>
          <th>Date</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td><input type="checkbox" /></td>
          <td class="product">
            <div class="img"></div>
            <div>
              <p class="name">{{ item.name }}</p>
              <small>{{ item.category }}</small>
            </div>
          </td>
          <td>{{ item.code }}</td>
          <td>{{ item.date }}</td>
          <td class="price">${{ item.price }}</td>
          <td>
            <span class="qty" :class="{ zero: item.qty === 0 }">
              {{ item.qty }}
            </span>
          </td>
          <td class="more">⋮</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductDashboard',
  data() {
    return {
      stats: [
        { title: 'Active Products', value: '247,384', trend: 15 },
        { title: 'New Products', value: '+2,368', trend: 2 },
        { title: 'Completed Order', value: '33,847', trend: -4.5 },
        { title: 'Pending Payment', value: '1,284', trend: 5 },
        { title: 'Canceled Order', value: '836', trend: -2 },
      ],
      products: [
        {
          id: 1,
          name: 'Whispers Beneath...',
          category: 'Romantic',
          code: 'TR-001-123456',
          date: 'Dec 22, 2023',
          price: 145,
          qty: 24,
        },
        {
          id: 2,
          name: 'The Silence Behind Room...',
          category: 'Horror',
          code: 'TR-002-123456',
          date: 'Dec 21, 2023',
          price: 942,
          qty: 12,
        },
        {
          id: 3,
          name: 'The Clock That Killed...',
          category: 'Horror',
          code: 'TR-006-123456',
          date: 'Dec 18, 2023',
          price: 1242,
          qty: 0,
        },
      ],
    }
  },
}
</script>

<style scoped>
.dashboard {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background: #f7f8fa;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.stat-title {
  color: #888;
  font-size: 13px;
}

.up {
  color: #22c55e;
}
.down {
  color: #ef4444;
}

/* Table Header */
.table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.primary {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
}

/* Table */
table {
  width: 100%;
  background: white;
  border-radius: 12px;
  border-collapse: collapse;
}

th,
td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.product {
  display: flex;
  gap: 10px;
  align-items: center;
}

.img {
  width: 40px;
  height: 40px;
  background: #ddd;
  border-radius: 6px;
}

.name {
  font-weight: 600;
}

.price {
  font-weight: 600;
}

.qty {
  background: #eefbe6;
  color: #22c55e;
  padding: 4px 12px;
  border-radius: 8px;
  display: inline-block;
}

.qty.zero {
  background: #fee2e2;
  color: #ef4444;
}

.more {
  text-align: center;
  cursor: pointer;
}
</style>
