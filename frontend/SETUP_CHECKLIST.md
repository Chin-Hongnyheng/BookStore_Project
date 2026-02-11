# BookStore Admin Dashboard - Setup Checklist

## Pre-Installation Checklist

- ✅ Node.js installed (^20.19.0 or >=22.12.0)
- ✅ npm or yarn available
- ✅ Git configured (optional)

## Files Generated (27 Total)

### Configuration Files (5)

- ✅ `package.json` - Updated with Tailwind dependencies
- ✅ `tailwind.config.js` - New Tailwind configuration
- ✅ `postcss.config.js` - New PostCSS configuration
- ✅ `src/main.js` - Updated with icons and setup
- ✅ `src/router/index.js` - Updated with admin routes

### Styling (1)

- ✅ `src/style.css` - New global styles

### Layout (1)

- ✅ `src/layouts/AdminLayout.vue` - New admin layout

### Views (5)

- ✅ `src/views/admin/DashboardView.vue`
- ✅ `src/views/admin/GenreView.vue`
- ✅ `src/views/admin/BookView.vue`
- ✅ `src/views/admin/PromotionView.vue`
- ✅ `src/views/admin/SubscriptionView.vue`

### Components (4)

- ✅ `src/components/StatCard.vue`
- ✅ `src/components/DataTable.vue`
- ✅ `src/components/Modal.vue`
- ✅ `src/components/Chart.vue`

### Stores (5)

- ✅ `src/stores/genreStore.js`
- ✅ `src/stores/bookStore.js`
- ✅ `src/stores/promotionStore.js`
- ✅ `src/stores/subscriptionStore.js`
- ✅ `src/stores/dashboardStore.js`

### Root Component (1)

- ✅ `src/App.vue` - Updated

### Documentation (3)

- ✅ `ADMIN_DASHBOARD_README.md`
- ✅ `QUICKSTART_GUIDE.md`
- ✅ `FILE_SUMMARY.md`
- ✅ `SETUP_CHECKLIST.md` (this file)

## Installation Steps

### Step 1: Install Dependencies ⬜

```bash
cd d:\ITC_I3\IP_I3S1\BookStore_Project\frontend
npm install
```

**Time:** ~2-3 minutes

### Step 2: Verify Installation ⬜

```bash
npm list vue pinia vue-router tailwindcss
```

### Step 3: Start Development Server ⬜

```bash
npm run dev
```

**Expected output:**

```
VITE v7.3.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Step 4: Open in Browser ⬜

Navigate to: `http://localhost:5173/admin/dashboard`

## Verification Checklist

### After Installation

- ⬜ All dependencies installed without errors
- ⬜ Dev server starts on port 5173
- ⬜ No TypeScript/ESLint errors in console
- ⬜ Tailwind CSS styles load correctly

### After Opening Dashboard

- ⬜ Admin layout renders with sidebar
- ⬜ Dashboard page loads with stats cards
- ⬜ Charts display correctly
- ⬜ Navigation sidebar links work
- ⬜ All 5 stat cards visible
- ⬜ 3 charts render (bar, line, pie)
- ⬜ Recent activities section visible
- ⬜ Top selling books section visible

### Dashboard Page (http://localhost:5173/admin/dashboard)

- ⬜ 5 stat cards displayed (Books, Genres, Promotions, Subscriptions, Revenue)
- ⬜ Monthly Sales bar chart
- ⬜ Genre Distribution pie chart
- ⬜ Monthly Revenue line chart
- ⬜ Recent Activities list
- ⬜ Top Selling Books list

### Genre Page (http://localhost:5173/admin/genres)

- ⬜ Genre table loads with 6 sample genres
- ⬜ Search functionality works
- ⬜ Pagination controls visible
- ⬜ "Add Genre" button works
- ⬜ Edit button opens modal
- ⬜ Delete button removes genre
- ⬜ Form validation works

### Book Page (http://localhost:5173/admin/books)

- ⬜ Book table loads with 5 sample books
- ⬜ All columns display correctly (ID, Title, Author, Genre, Price)
- ⬜ Search functionality works
- ⬜ Pagination works
- ⬜ "Add Book" button opens modal
- ⬜ Edit button opens modal with data
- ⬜ Delete button removes book
- ⬜ Form includes all fields:
  - Title, Author, Genre (select)
  - Price, Rating
  - Description (textarea)
  - Cover Image URL
  - Book Groups (checkboxes)
- ⬜ Form validation prevents submission without required fields

### Promotion Page (http://localhost:5173/admin/promotions)

- ⬜ Promotion table loads with 4 sample promotions
- ⬜ Status badges show correct colors
- ⬜ "Add Promotion" button works
- ⬜ Form includes:
  - Name, Description
  - Type selection (Sale, % Off, Hot Badge)
  - Discount field (conditional)
  - Date range (start & end)
  - Book selection (checkboxes)
- ⬜ Date validation prevents invalid ranges
- ⬜ Type change updates form fields

### Subscription Page (http://localhost:5173/admin/subscriptions)

- ⬜ 3 summary cards display:
  - Active Subscriptions count
  - Monthly Revenue total
  - Total Subscribers count
- ⬜ Subscription table loads with 5 samples
- ⬜ Status badges show correct colors
- ⬜ "Add Subscription" button works
- ⬜ Form includes:
  - User Name, Email, User ID
  - Plan selection (auto-fills price)
  - Start/End dates
  - Status selection
- ⬜ Plan selection updates amount field

## Common Issues & Solutions

### Issue: npm install fails

**Solution:**

```bash
# Clear npm cache
npm cache clean --force
# Try again
npm install
```

### Issue: Port 5173 already in use

**Solution:**

```bash
npm run dev -- --port 3000
```

### Issue: Tailwind CSS not working

**Solution:**

```bash
# Reinstall Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Issue: Components not found

**Solution:**

- Check that `@/` path alias is configured in `vite.config.js`
- Verify file extensions match `.vue` exactly

### Issue: Icons not showing

**Solution:**

```bash
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome
```

## Performance Tips

1. **Development**: Dashboard should load in < 2 seconds
2. **Hot Module Replacement**: Changes reflect instantly
3. **Search**: Client-side search handles 1000+ items
4. **Pagination**: Limits rendered items to improve performance

## Browser DevTools Checklist

### Vue DevTools

- ⬜ Install Vue DevTools browser extension
- ⬜ Open DevTools (F12 or Ctrl+Shift+I)
- ⬜ Switch to Vue tab
- ⬜ Inspect components and props

### Pinia DevTools

- ⬜ Open Pinia in Vue DevTools
- ⬜ View all store states
- ⬜ Verify dummy data loaded
- ⬜ Test mutations by editing forms

## Next: API Integration

When ready to connect to backend:

### 1. Update API Base URL

```javascript
// src/main.js or axios config
const API_BASE = 'http://localhost:3000/api'
```

### 2. Update Stores with API Calls

```javascript
// src/stores/bookStore.js
const fetchBooks = async () => {
  const response = await axios.get(`${API_BASE}/books`)
  books.value = response.data
}
```

### 3. Add Error Handling

```javascript
try {
  await fetchBooks()
} catch (error) {
  console.error('Failed to fetch:', error)
  // Show error message to user
}
```

### 4. Add Loading States

```javascript
const isLoading = ref(false)

const fetchBooks = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(`${API_BASE}/books`)
    books.value = response.data
  } finally {
    isLoading.value = false
  }
}
```

## Build & Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` folder with optimized files

### Preview Production Build

```bash
npm run preview
```

### Deploy to Server

```bash
# Copy dist folder to web server
# Configure web server to serve index.html
```

## Testing (Optional)

### Run Unit Tests

```bash
npm run test:unit
```

### Lint Code

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

## Final Checklist

- ⬜ All dependencies installed
- ⬜ Dev server running without errors
- ⬜ All 5 admin pages load correctly
- ⬜ Search and pagination work
- ⬜ CRUD operations work (add/edit/delete)
- ⬜ Forms validate correctly
- ⬜ Charts render properly
- ⬜ Responsive design works on mobile
- ⬜ No console errors or warnings
- ⬜ Navigation works smoothly

## Support Resources

| Resource     | URL                       |
| ------------ | ------------------------- |
| Vue 3 Docs   | https://vuejs.org/        |
| Pinia Docs   | https://pinia.vuejs.org/  |
| Vue Router   | https://router.vuejs.org/ |
| Tailwind CSS | https://tailwindcss.com/  |
| Vite Docs    | https://vitejs.dev/       |
| FontAwesome  | https://fontawesome.com/  |

## Success! 🎉

Once all checks pass, your BookStore Admin Dashboard is ready to use!

### Quick Links After Setup

- Dashboard: http://localhost:5173/admin/dashboard
- Genres: http://localhost:5173/admin/genres
- Books: http://localhost:5173/admin/books
- Promotions: http://localhost:5173/admin/promotions
- Subscriptions: http://localhost:5173/admin/subscriptions

---

**Setup Version**: 1.0.0  
**Last Updated**: January 29, 2026  
**Status**: Ready for Setup and Testing
