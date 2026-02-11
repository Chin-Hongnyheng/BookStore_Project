# 📋 BookStore Admin Dashboard - Reference Card

## Quick Reference

### Installation & Running

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173/admin/dashboard
```

### Available Routes

| Path                   | Page          | Purpose                        |
| ---------------------- | ------------- | ------------------------------ |
| `/admin/dashboard`     | Dashboard     | Overview with stats and charts |
| `/admin/genres`        | Genres        | Manage book genres             |
| `/admin/books`         | Books         | Manage book inventory          |
| `/admin/promotions`    | Promotions    | Manage promotional campaigns   |
| `/admin/subscriptions` | Subscriptions | Manage user subscriptions      |

### Key Components

| Component | File                           | Used For        |
| --------- | ------------------------------ | --------------- |
| StatCard  | `src/components/StatCard.vue`  | Display metrics |
| DataTable | `src/components/DataTable.vue` | List & CRUD     |
| Modal     | `src/components/Modal.vue`     | Forms & dialogs |
| Chart     | `src/components/Chart.vue`     | Visualizations  |

### Pinia Stores

| Store             | File                              | Manages        |
| ----------------- | --------------------------------- | -------------- |
| genreStore        | `src/stores/genreStore.js`        | Genres         |
| bookStore         | `src/stores/bookStore.js`         | Books          |
| promotionStore    | `src/stores/promotionStore.js`    | Promotions     |
| subscriptionStore | `src/stores/subscriptionStore.js` | Subscriptions  |
| dashboardStore    | `src/stores/dashboardStore.js`    | Dashboard data |

---

## Component Props & Events

### StatCard.vue

```vue
<StatCard
  title="Total Books"
  :value="42"
  subtitle="Books in store"
  icon="book"
  iconColor="text-blue-500"
/>
```

### DataTable.vue

```vue
<DataTable
  :items="items"
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ]"
  @edit="handleEdit"
  @delete="handleDelete"
>
  <template #cell-name="{ item }">
    <strong>{{ item.name }}</strong>
  </template>
</DataTable>
```

### Modal.vue

```vue
<Modal
  v-if="showModal"
  title="Add Item"
  submitButtonLabel="Create"
  @close="closeModal"
  @submit="submitForm"
>
  <!-- Form content -->
</Modal>
```

### Chart.vue

```vue
<Chart
  type="bar"
  title="Sales"
  :data="[
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
  ]"
/>
```

---

## Form Validation

### Common Validation Checks

```javascript
// Required field
if (!formData.name.trim()) {
  alert('Name is required')
  return
}

// Email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(formData.email)) {
  alert('Invalid email')
  return
}

// Date range
if (new Date(startDate) > new Date(endDate)) {
  alert('Start date must be before end date')
  return
}

// Numeric range
if (formData.price < 0 || formData.price > 10000) {
  alert('Price must be between 0 and 10000')
  return
}
```

---

## Store Usage Pattern

### Import Store

```javascript
import { useGenreStore } from '@/stores/genreStore'

const genreStore = useGenreStore()
```

### Access State

```javascript
// All genres
const allGenres = genreStore.genres

// Computed genres count
const count = computed(() => genreStore.genres.length)
```

### Call Actions

```javascript
// Add
genreStore.addGenre({ name: 'Horror', description: '...' })

// Update
genreStore.updateGenre(1, { name: 'Thriller' })

// Delete
genreStore.deleteGenre(1)
```

---

## Tailwind CSS Classes

### Buttons

```html
<!-- Primary button -->
<button class="btn btn-primary">Click me</button>

<!-- Secondary button -->
<button class="btn btn-secondary">Cancel</button>

<!-- Danger button -->
<button class="btn btn-danger">Delete</button>

<!-- Success button -->
<button class="btn btn-success">Save</button>

<!-- Small button -->
<button class="btn btn-primary btn-sm">Small</button>
```

### Cards

```html
<div class="card">
  <h2 class="text-lg font-bold">Card Title</h2>
  <p>Card content here</p>
</div>
```

### Forms

```html
<div class="form-group">
  <label for="name" class="label">Name:</label>
  <input id="name" type="text" class="input-field" />
</div>
```

### Badges

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
```

---

## Vue 3 Composition API Patterns

### Reactive State

```javascript
import { ref, reactive } from 'vue'

// Single value
const count = ref(0)
count.value++ // Access with .value

// Object
const form = reactive({
  name: '',
  email: '',
})
form.name = 'John' // Direct access
```

### Computed Properties

```javascript
import { computed } from 'vue'

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
```

### Methods

```javascript
const handleClick = () => {
  // Do something
}

const doubleCount = () => count.value * 2
```

### Watchers

```javascript
import { watch } from 'vue'

watch(
  () => formData.genre,
  (newVal) => {
    console.log('Genre changed to:', newVal)
  },
)
```

---

## Common Tasks

### Add New Entity Management Page

1. Create store: `src/stores/entityStore.js`
2. Create view: `src/views/admin/EntityView.vue`
3. Add route in `src/router/index.js`
4. Add sidebar link in `src/layouts/AdminLayout.vue`

### Create New Reusable Component

1. Create file: `src/components/MyComponent.vue`
2. Define props/emits in `<script setup>`
3. Use Tailwind classes for styling
4. Import and use in pages

### Connect to Backend API

1. Install axios (already done)
2. Update store action:

```javascript
const fetchItems = async () => {
  try {
    const response = await axios.get('/api/items')
    items.value = response.data
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### Add Form Field Validation

```javascript
const validateForm = () => {
  const errors = {}

  if (!formData.name) errors.name = 'Name is required'
  if (formData.price < 0) errors.price = 'Price must be positive'

  return Object.keys(errors).length === 0
}
```

---

## Troubleshooting Quick Fixes

| Problem              | Solution                                          |
| -------------------- | ------------------------------------------------- |
| Tailwind not working | `npm install -D tailwindcss postcss autoprefixer` |
| Port already in use  | `npm run dev -- --port 3000`                      |
| Components not found | Check `@/` alias in vite.config.js                |
| Icons not showing    | Check icons are added in main.js                  |
| Form not validating  | Check validation logic before store.add()         |
| Search not working   | Check DataTable receives correct :items           |
| Styles not applying  | Check style.css is imported in main.js            |

---

## File Structure Quick View

```
frontend/
├── src/
│   ├── components/        ← UI Components
│   │   ├── StatCard.vue
│   │   ├── DataTable.vue
│   │   ├── Modal.vue
│   │   └── Chart.vue
│   ├── layouts/           ← Layouts
│   │   └── AdminLayout.vue
│   ├── views/             ← Pages
│   │   └── admin/
│   │       ├── DashboardView.vue
│   │       ├── GenreView.vue
│   │       ├── BookView.vue
│   │       ├── PromotionView.vue
│   │       └── SubscriptionView.vue
│   ├── stores/            ← Pinia Stores
│   │   ├── dashboardStore.js
│   │   ├── genreStore.js
│   │   ├── bookStore.js
│   │   ├── promotionStore.js
│   │   └── subscriptionStore.js
│   ├── router/
│   │   └── index.js       ← Routing
│   ├── App.vue            ← Root
│   ├── main.js            ← Entry point
│   └── style.css          ← Global styles
├── tailwind.config.js     ← Tailwind config
├── postcss.config.js      ← PostCSS config
├── package.json
└── Documentation files
```

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview built version
npm run lint             # Check code style
npm run format           # Format code
npm run test:unit        # Run tests

# Package Management
npm install              # Install dependencies
npm install -D pkg       # Install dev dependency
npm update               # Update dependencies
npm audit                # Check for vulnerabilities
npm cache clean --force  # Clear cache

# Troubleshooting
npm list                 # List installed packages
npm doctor               # Diagnose issues
npm dedupe               # Remove duplicate packages
```

---

## Data Structure Examples

### Genre

```javascript
{
  id: 1,
  name: "Fiction",
  description: "Fictional novels and stories"
}
```

### Book

```javascript
{
  id: 1,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "Fiction",
  price: 12.99,
  description: "A classic novel...",
  cover: "https://example.com/image.jpg",
  groups: ["Featured", "Trending"],
  rating: 4.8,
  reviews: 245
}
```

### Promotion

```javascript
{
  id: 1,
  name: "Summer Sale",
  type: "Sale",
  discount: 20,
  startDate: "2026-06-01",
  endDate: "2026-08-31",
  books: [1, 2, 3],
  status: "Active",
  description: "Summer discount..."
}
```

### Subscription

```javascript
{
  id: 1,
  userId: "USR001",
  userName: "John Doe",
  email: "john@example.com",
  plan: "Premium",
  startDate: "2025-12-01",
  endDate: "2026-12-01",
  amount: 9.99,
  status: "Active"
}
```

---

## Browser Support

✅ Chrome/Chromium (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)

---

## Performance Tips

- ✅ Client-side search/pagination keeps 1000+ items responsive
- ✅ Lazy-loaded routes reduce initial bundle
- ✅ Vue 3 reactive system optimizes re-renders
- ✅ Tailwind CSS purges unused styles in production

---

## Next: API Integration

When connecting to backend:

1. Set API base URL
2. Update store actions to use axios
3. Add error handling
4. Add loading states
5. Update form submissions

---

## Documentation Map

| Document                  | Purpose           | Read Time |
| ------------------------- | ----------------- | --------- |
| INDEX.md                  | Navigation hub    | 5 min     |
| IMPLEMENTATION_SUMMARY.md | Complete overview | 10 min    |
| ADMIN_DASHBOARD_README.md | Detailed docs     | 20 min    |
| QUICKSTART_GUIDE.md       | Setup guide       | 5 min     |
| SETUP_CHECKLIST.md        | Verification      | 10 min    |
| REFERENCE_CARD.md         | This file         | 5 min     |

---

## Need More Help?

1. Check the appropriate documentation file above
2. Search for issue in SETUP_CHECKLIST.md
3. Review component code in `src/`
4. Check Vue 3 or Pinia documentation
5. Review implementation examples in existing pages

---

**Version**: 1.0.0
**Created**: January 29, 2026
**Status**: ✅ Ready to Use

**Quick Start**: `npm install && npm run dev`
