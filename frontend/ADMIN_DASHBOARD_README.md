# BookStore Admin Dashboard

A complete Vue 3 admin dashboard for managing a bookstore with comprehensive features for managing genres, books, promotions, and subscriptions.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── StatCard.vue          # Dashboard stats card component
│   │   ├── DataTable.vue         # Reusable data table with search & pagination
│   │   ├── Modal.vue             # Reusable modal component
│   │   ├── Chart.vue             # Chart component (bar, line, pie)
│   │   ├── HeaderComponent.vue   # Legacy header component
│   │   ├── BookHeader.vue        # Legacy book header
│   │   ├── NavigationComponent.vue
│   │   └── SearchbarComponent.vue
│   ├── layouts/
│   │   └── AdminLayout.vue       # Main admin layout with sidebar
│   ├── views/
│   │   ├── admin/
│   │   │   ├── DashboardView.vue      # Admin dashboard overview
│   │   │   ├── GenreView.vue          # Manage genres
│   │   │   ├── BookView.vue           # Manage books
│   │   │   ├── PromotionView.vue      # Manage promotions
│   │   │   └── SubscriptionView.vue   # Manage subscriptions
│   │   ├── DashboardView.vue          # Legacy dashboard
│   │   └── BookView.vue               # Legacy book view
│   ├── stores/
│   │   ├── genreStore.js         # Genre state management
│   │   ├── bookStore.js          # Book state management
│   │   ├── promotionStore.js     # Promotion state management
│   │   ├── subscriptionStore.js  # Subscription state management
│   │   ├── dashboardStore.js     # Dashboard stats & data
│   │   └── BookData.js           # Legacy store
│   ├── router/
│   │   └── index.js              # Vue Router configuration
│   ├── assets/                   # Static assets
│   ├── App.vue                   # Root component
│   ├── main.js                   # Application entry point
│   └── style.css                 # Global Tailwind CSS styles
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── package.json
├── vite.config.js
├── vitest.config.js
└── index.html

```

## Features

### 1. Dashboard Overview

- **Stats Cards**: Display total books, genres, promotions, and active subscriptions
- **Charts**:
  - Monthly sales bar chart
  - Monthly revenue line chart
  - Genre distribution pie chart
- **Recent Activities**: Activity feed showing recent changes
- **Top Selling Books**: List of best-performing books with sales data

### 2. Genre Management

- **List View**: Table of all genres with search and pagination
- **Add Genre**: Form to create new genres
- **Edit Genre**: Update existing genre information
- **Delete Genre**: Remove genres from the system
- **Search & Filter**: Search through genre name and description

### 3. Book Management

- **List View**: Table showing all books with:
  - Cover image (placeholder URL)
  - Title, author, genre, price
  - Book groups (New, Featured, Trending, Hot)
- **Add Book**: Comprehensive form including:
  - Title, author, genre selection
  - Price and rating
  - Description
  - Cover image URL
  - Book group assignment
- **Edit Book**: Modify existing book information
- **Delete Book**: Remove books from inventory
- **Export**: Export book data to CSV/JSON

### 4. Promotion Management

- **List View**: Table of all active and upcoming promotions
- **Add Promotion**: Create promotions with:
  - Promotion name
  - Type selection (Sale, % Off, Hot Badge)
  - Discount amount
  - Start and end dates
  - Select applicable books
- **Edit Promotion**: Update promotion details
- **Delete Promotion**: Remove promotions
- **Status Tracking**: Active, Upcoming, Expired statuses

### 5. Subscription Management

- **List View**: Table showing all subscriptions with:
  - User information (name, email)
  - Plan type (Basic, Premium, VIP)
  - Monthly amount
  - Status and end date
- **Summary Cards**:
  - Active subscription count
  - Monthly revenue total
  - Total subscriber count
- **Add Subscription**: Create new subscriptions with:
  - User details
  - Plan selection (auto-fills price)
  - Start and end dates
  - Status
- **Edit Subscription**: Modify subscription details
- **Delete Subscription**: Remove subscriptions

## Technology Stack

### Frontend Framework

- **Vue 3**: Modern reactive UI framework with Composition API
- **Vue Router 4**: Client-side routing
- **Pinia**: State management (replacing Vuex)

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Icons & UI

- **FontAwesome 7**: Icon library with Vue integration
- **Custom Components**: Reusable UI components

### Build Tools

- **Vite**: Fast build tool and dev server
- **Vitest**: Unit testing framework
- **ESLint**: Code quality
- **Prettier**: Code formatting

## Installation & Setup

### Prerequisites

- Node.js (^20.19.0 or >=22.12.0)
- npm or yarn

### Installation Steps

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Install Tailwind CSS** (if not already installed)

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Build for Production**

   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Component Documentation

### StatCard.vue

Displays a metric with icon and description.

**Props:**

- `title` (String): Card title
- `value` (String/Number): Main metric value
- `subtitle` (String): Descriptive subtitle
- `icon` (String): FontAwesome icon name
- `iconColor` (String): Tailwind color class (default: 'text-blue-500')

**Usage:**

```vue
<StatCard
  title="Total Books"
  :value="books.length"
  subtitle="All books in store"
  icon="book"
  iconColor="text-blue-500"
/>
```

### DataTable.vue

Reusable table component with search, pagination, and CRUD operations.

**Props:**

- `items` (Array): Array of data objects
- `columns` (Array): Column definitions with `key` and `label`
- `itemsPerPage` (Number): Items per page (default: 10)

**Events:**

- `@edit`: Emitted when edit button is clicked
- `@delete`: Emitted when delete button is clicked

**Slots:**

- `#cell-{columnKey}`: Custom cell rendering
- `#toolbar`: Custom toolbar content

**Usage:**

```vue
<DataTable
  :items="books"
  :columns="[
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
  ]"
  @edit="editBook"
  @delete="deleteBook"
>
  <template #cell-price="{ item }">
    ${{ item.price.toFixed(2) }}
  </template>
</DataTable>
```

### Modal.vue

Reusable modal dialog for forms and confirmations.

**Props:**

- `title` (String): Modal title
- `showFooter` (Boolean): Show submit/cancel buttons (default: true)
- `submitButtonLabel` (String): Submit button text (default: 'Submit')

**Events:**

- `@close`: Emitted when modal is closed
- `@submit`: Emitted when submit is clicked

**Usage:**

```vue
<Modal v-if="showModal" title="Add New Genre" @close="closeModal" @submit="submitForm">
  <form>
    <!-- Form fields here -->
  </form>
</Modal>
```

### Chart.vue

Chart component supporting bar, line, and pie charts.

**Props:**

- `type` (String): Chart type ('bar', 'line', 'pie')
- `data` (Array): Array of `{ label, value }` objects
- `title` (String): Chart title

**Usage:**

```vue
<Chart
  type="bar"
  title="Monthly Sales"
  :data="[
    { label: 'Jan', value: 2400 },
    { label: 'Feb', value: 1398 },
  ]"
/>
```

## Store Documentation

### genreStore.js

Manages genre data with CRUD operations.

**State:**

- `genres`: Array of genre objects

**Actions:**

- `addGenre(genre)`: Add new genre
- `updateGenre(id, updatedGenre)`: Update genre
- `deleteGenre(id)`: Delete genre

### bookStore.js

Manages book data with support for book groups.

**State:**

- `books`: Array of book objects

**Actions:**

- `addBook(book)`: Add new book
- `updateBook(id, updatedBook)`: Update book
- `deleteBook(id)`: Delete book
- `updateBookGroups(id, groups)`: Update book group assignment

### promotionStore.js

Manages promotional campaigns.

**State:**

- `promotions`: Array of promotion objects

**Actions:**

- `addPromotion(promotion)`: Create promotion
- `updatePromotion(id, updatedPromotion)`: Update promotion
- `deletePromotion(id)`: Delete promotion

### subscriptionStore.js

Manages user subscriptions and plans.

**State:**

- `subscriptions`: Array of subscription objects
- `plans`: Available subscription plans

**Actions:**

- `addSubscription(subscription)`: Create subscription
- `updateSubscription(id, updatedSubscription)`: Update subscription
- `deleteSubscription(id)`: Delete subscription
- `getActiveCount()`: Get count of active subscriptions
- `getTotalRevenue()`: Calculate total monthly revenue

### dashboardStore.js

Aggregates dashboard data and statistics.

**State:**

- `dashboardStats`: Computed statistics from other stores
- `recentActivities`: Recent activity feed
- `salesData`: Sales and revenue data with charts

## Routing

The admin dashboard uses the following routes:

- `/admin/dashboard` - Dashboard overview
- `/admin/genres` - Genre management
- `/admin/books` - Book management
- `/admin/promotions` - Promotion management
- `/admin/subscriptions` - Subscription management

Legacy routes are preserved:

- `/Dashboard` - Legacy dashboard
- `/Book` - Legacy book view

## Form Validation

All forms include validation for:

- Required field checks
- Email format validation
- Date range validation (start date < end date)
- Numeric range validation (price, rating, discount)

## Responsive Design

The dashboard is fully responsive using Tailwind CSS breakpoints:

- **Mobile**: Single column layout
- **Tablet**: Two column grid
- **Desktop**: Three+ column grid

## Dummy Data

The application includes comprehensive dummy data for:

- 6 genres with descriptions
- 5 books with complete information and ratings
- 4 active/upcoming promotions
- 5 user subscriptions with different statuses
- Sales data with monthly trends
- Top-selling books with revenue

## Styling with Tailwind CSS

Key Tailwind classes used throughout:

- `card`: White background with rounded corners and shadow
- `btn btn-primary/secondary/danger/success`: Button styles
- `input-field`: Form input styling
- `label`: Form label styling
- `badge badge-{color}`: Status badges
- `table-responsive`: Mobile-friendly tables

## Future Enhancements

Potential additions to the dashboard:

- Backend API integration with Axios
- User authentication and authorization
- Real-time data updates with WebSockets
- Advanced filtering and multi-sort
- Bulk operations for books
- Discount code generation
- Customer analytics
- Inventory management
- Book reviews and ratings display
- Email notifications
- Dark mode support

## Browser Compatibility

The dashboard is compatible with:

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Notes

- Components use Vue 3 Composition API for optimal performance
- Lazy loading for routes reduces initial bundle size
- Pagination limits rendered items
- Debounced search for large datasets

## Contributing

When adding new features:

1. Create corresponding Pinia store if managing state
2. Use existing reusable components
3. Follow the established file structure
4. Use Tailwind CSS for styling
5. Add form validation for user inputs
6. Document new components and stores

## License

This project is part of the BookStore application suite.
