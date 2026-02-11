# BookStore Admin Dashboard - Complete Setup Guide

## Quick Start

### Installation

```bash
cd frontend
npm install
npm run dev
```

The admin dashboard will be available at `http://localhost:5173/admin/dashboard`

## File Structure Overview

### Core Application Files

#### Main Entry Point

- **[src/main.js](src/main.js)** - Application initialization with Vue 3, Pinia, Router, and FontAwesome

#### Root Component

- **[src/App.vue](src/App.vue)** - Root component that renders router-view

#### Styling

- **[src/style.css](src/style.css)** - Global Tailwind CSS styles and utility classes
- **[tailwind.config.js](tailwind.config.js)** - Tailwind CSS configuration
- **[postcss.config.js](postcss.config.js)** - PostCSS plugin configuration

#### Router Configuration

- **[src/router/index.js](src/router/index.js)** - Vue Router setup with all admin routes

### Layouts

- **[src/layouts/AdminLayout.vue](src/layouts/AdminLayout.vue)** - Main admin layout with sidebar navigation

### Admin Views (Pages)

- **[src/views/admin/DashboardView.vue](src/views/admin/DashboardView.vue)** - Dashboard with stats and charts
- **[src/views/admin/GenreView.vue](src/views/admin/GenreView.vue)** - Genre management
- **[src/views/admin/BookView.vue](src/views/admin/BookView.vue)** - Book management with full CRUD
- **[src/views/admin/PromotionView.vue](src/views/admin/PromotionView.vue)** - Promotion management
- **[src/views/admin/SubscriptionView.vue](src/views/admin/SubscriptionView.vue)** - Subscription management

### Reusable Components

- **[src/components/StatCard.vue](src/components/StatCard.vue)** - Dashboard statistic card
- **[src/components/DataTable.vue](src/components/DataTable.vue)** - Table with search, pagination, and CRUD
- **[src/components/Modal.vue](src/components/Modal.vue)** - Reusable modal dialog
- **[src/components/Chart.vue](src/components/Chart.vue)** - Chart component (bar, line, pie)

### State Management (Pinia Stores)

- **[src/stores/dashboardStore.js](src/stores/dashboardStore.js)** - Dashboard statistics and data
- **[src/stores/genreStore.js](src/stores/genreStore.js)** - Genre data management
- **[src/stores/bookStore.js](src/stores/bookStore.js)** - Book data management
- **[src/stores/promotionStore.js](src/stores/promotionStore.js)** - Promotion data management
- **[src/stores/subscriptionStore.js](src/stores/subscriptionStore.js)** - Subscription data management

### Configuration Files

- **[package.json](package.json)** - Dependencies and scripts (includes Tailwind CSS)
- **[vite.config.js](vite.config.js)** - Vite bundler configuration
- **[vitest.config.js](vitest.config.js)** - Testing framework configuration
- **[.eslintrc.cjs](.eslintrc.cjs)** - ESLint configuration

### Documentation

- **[ADMIN_DASHBOARD_README.md](ADMIN_DASHBOARD_README.md)** - Comprehensive documentation
- **[QUICKSTART_GUIDE.md](QUICKSTART_GUIDE.md)** - This file

## Features Implemented

### 1. Dashboard Overview ✅

- 5 statistics cards (Total Books, Genres, Promotions, Subscriptions, Revenue)
- Monthly sales bar chart
- Monthly revenue line chart
- Genre distribution pie chart
- Recent activities feed
- Top selling books list

### 2. Genre Management ✅

- List all genres in a searchable table
- Add new genre
- Edit genre information
- Delete genre
- Pagination support
- Form validation

### 3. Book Management ✅

- List all books with details (title, author, genre, price)
- Add new book with:
  - Title, author, genre selection
  - Price and rating
  - Description
  - Cover image URL
  - Book group assignment (New, Featured, Trending, Hot)
- Edit book information
- Delete book
- Export functionality
- Search and pagination
- Form validation

### 4. Promotion Management ✅

- List all promotions with status
- Create promotion with:
  - Name and description
  - Type selection (Sale, % Off, Hot Badge)
  - Discount amount
  - Start and end dates
  - Select applicable books
- Edit promotion
- Delete promotion
- Status tracking (Active, Upcoming, Expired)
- Date range validation

### 5. Subscription Management ✅

- List all subscriptions with user details
- Summary cards showing:
  - Active subscription count
  - Monthly revenue
  - Total subscribers
- Add subscription with:
  - User information (name, email)
  - Plan selection (Basic, Premium, VIP)
  - Auto-calculated amounts
  - Start/end dates
  - Status selection
- Edit subscription
- Delete subscription
- Search and pagination

## Dummy Data Included

### Genres (6)

- Fiction
- Non-Fiction
- Mystery
- Science Fiction
- Romance
- History

### Books (5)

- The Great Gatsby - F. Scott Fitzgerald - Fiction - $12.99
- 1984 - George Orwell - Science Fiction - $13.99
- To Kill a Mockingbird - Harper Lee - Fiction - $14.99
- Sapiens - Yuval Noah Harari - Non-Fiction - $18.99
- The Silent Patient - Alex Michaelides - Mystery - $16.99

### Promotions (4)

- Summer Sale (20% off)
- New Year 30% Off
- Best Sellers (Hot Badge)
- Flash Sale (15% off)

### Subscriptions (5)

- John Doe - Premium - $9.99/month - Active
- Jane Smith - Basic - $4.99/month - Active
- Bob Johnson - Premium - $9.99/month - Expiring Soon
- Alice Brown - Premium - $9.99/month - Active
- Charlie Davis - Basic - $4.99/month - Expired

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm run test:unit

# Lint and fix code
npm run lint

# Format code with Prettier
npm run format
```

## Project Routes

### Admin Routes

- `/admin/dashboard` - Dashboard overview
- `/admin/genres` - Manage genres
- `/admin/books` - Manage books
- `/admin/promotions` - Manage promotions
- `/admin/subscriptions` - Manage subscriptions

### Legacy Routes (Preserved)

- `/Dashboard` - Legacy dashboard
- `/Book` - Legacy book view

## Technology Stack Summary

| Technology   | Version | Purpose            |
| ------------ | ------- | ------------------ |
| Vue          | 3.5.26  | Frontend framework |
| Vue Router   | 4.6.4   | Routing            |
| Pinia        | 3.0.4   | State management   |
| Tailwind CSS | 3.4.17  | Styling            |
| Vite         | 7.3.0   | Build tool         |
| FontAwesome  | 7.1.0   | Icons              |
| Axios        | 1.13.2  | HTTP client        |

## Component Hierarchy

```
App.vue (router-view)
├── AdminLayout.vue (sidebar + header)
│   ├── DashboardView.vue
│   │   ├── StatCard (x5)
│   │   ├── Chart (x3)
│   │   └── Activity/Sales sections
│   ├── GenreView.vue
│   │   ├── DataTable
│   │   └── Modal (with form)
│   ├── BookView.vue
│   │   ├── DataTable
│   │   └── Modal (with form)
│   ├── PromotionView.vue
│   │   ├── DataTable
│   │   └── Modal (with form)
│   └── SubscriptionView.vue
│       ├── StatCard (x3)
│       ├── DataTable
│       └── Modal (with form)
```

## Key Features

### Data Management

- ✅ Full CRUD operations for all entities
- ✅ Real-time state management with Pinia
- ✅ Dummy data for demonstration

### User Interface

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Search and pagination in tables
- ✅ Modal dialogs for forms
- ✅ Status badges with color coding
- ✅ Charts and statistics

### Forms

- ✅ Input validation
- ✅ Date range validation
- ✅ Required field checks
- ✅ Auto-calculated values

### Navigation

- ✅ Sidebar navigation
- ✅ Active route highlighting
- ✅ Responsive header

## Development Workflow

1. **Add New Entity**
   - Create Pinia store in `src/stores/`
   - Create view component in `src/views/admin/`
   - Add route to `src/router/index.js`
   - Add sidebar link to `src/layouts/AdminLayout.vue`

2. **Add New Component**
   - Create component in `src/components/`
   - Define props and emits
   - Use Tailwind CSS classes
   - Document with JSDoc comments

3. **Style Changes**
   - Use existing Tailwind classes
   - Add custom classes to `src/style.css` if needed
   - Follow color scheme defined in `tailwind.config.js`

## Performance Considerations

- Vue 3 Composition API for optimal rendering
- Lazy-loaded routes via Vue Router
- Pagination to limit rendered items
- Search implemented client-side for simplicity

## Future Integration

When integrating with backend API:

1. **Replace dummy data** with API calls in stores
2. **Update axios** configuration with API endpoints
3. **Add error handling** for API failures
4. **Implement authentication** in main.js or router guards
5. **Add loading states** to components
6. **Implement form submissions** to API endpoints

Example API integration:

```javascript
// In store action
const fetchBooks = async () => {
  try {
    const response = await axios.get('/api/books')
    books.value = response.data
  } catch (error) {
    console.error('Failed to fetch books:', error)
  }
}
```

## Troubleshooting

### Tailwind CSS not working

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Port 5173 already in use

```bash
npm run dev -- --port 3000
```

### Components not found

Ensure `src/` path is properly configured in imports:

```vue
<script setup>
import MyComponent from '@/components/MyComponent.vue'
</script>
```

## Support

Refer to:

- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)

---

**Dashboard Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Ready for Development
