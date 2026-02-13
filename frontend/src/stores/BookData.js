import { defineStore } from 'pinia'
import axios from 'axios'

export const useBookStore = defineStore('book', {
  state: () => ({
    // From File 1 & 2
    products: [],
    genres: [],
    genreCounts: [],
    newArrivals: [],
    Recommendations: [],
    promotions: [], // From File 2
  }),

  getters: {
    // Main processed products with promotions - used by most components
    processedProducts(state) {
      return state.products.map((p) => {
        const now = new Date()
        const price = Number(p.price)

        // Find active promotions for this product
        const applicablePromotions = state.promotions.filter((promo) => {
          const promoStart = new Date(promo.startDate)
          const promoEnd = new Date(promo.endDate)
          const isActive = now >= promoStart && now <= promoEnd
          const hasProduct =
            promo.products?.some((prod) => prod.id === p.id) || promo.books?.includes(p.id)
          return isActive && hasProduct && (promo.type === '% Off' || promo.type === 'Sale')
        })

        let discountValue = 0
        let discountType = 'percentage'

        if (applicablePromotions.length > 0) {
          const discountAmounts = applicablePromotions
            .map((promo) => {
              const promoDiscount = Number(promo.discount)
              if (promo.type === '% Off') {
                return {
                  amount: (price * promoDiscount) / 100,
                  discount: promoDiscount,
                  type: 'percentage',
                }
              } else if (promo.type === 'Sale') {
                return { amount: promoDiscount, discount: promoDiscount, type: 'fixed' }
              }
            })
            .filter(Boolean)

          if (discountAmounts.length > 0) {
            const bestPromotion = discountAmounts.reduce((max, current) =>
              current.amount > max.amount ? current : max,
            )
            discountValue = bestPromotion.discount
            discountType = bestPromotion.type
          }
        }

        let finalPrice = price
        if (discountValue > 0) {
          finalPrice =
            discountType === 'percentage'
              ? price - (price * discountValue) / 100
              : Math.max(0, price - discountValue)
        }

        // Badges Logic
        const hotBadgePromo = state.promotions.find((promo) => {
          const isActive = now >= new Date(promo.startDate) && now <= new Date(promo.endDate)
          const hasProduct =
            promo.products?.some((prod) => prod.id === p.id) || promo.books?.includes(p.id)
          return isActive && hasProduct && promo.type === 'Hot Badge'
        })

        const hasBuy1Get1 = state.promotions.some((promo) => {
          const isActive = now >= new Date(promo.startDate) && now <= new Date(promo.endDate)
          const hasProduct =
            promo.products?.some((prod) => prod.id === p.id) || promo.books?.includes(p.id)
          return isActive && hasProduct && promo.type === 'Buy 1 Get 1'
        })

        return {
          ...p,
          price,
          discount: discountValue,
          discountType,
          rating: Number(p.rating ?? 0),
          inStock: Number(p.inStock),
          pages: Number(p.pages),
          finalPrice,
          genreIds: p.genres?.map((g) => g.id) || [],
          hasHotBadge: !!hotBadgePromo,
          hotBadgeText: hotBadgePromo?.badgeText || '🔥 HOT',
          hasBuy1Get1,
        }
      })
    },

    // New Arrivals - uses processedProducts for promotion support
    newArrivalProducts(state) {
      const newArrivalIds = state.newArrivals.map((na) => na.product?.id)
      return this.processedProducts.filter((p) => newArrivalIds.includes(p.id))
    },

    // Recommendations - uses processedProducts for promotion support
    recommendationProducts(state) {
      const recommendationIds = state.Recommendations.map((ra) => ra.product?.id)
      return this.processedProducts.filter((p) => recommendationIds.includes(p.id))
    },

    // Best Selling - with fallback if no countSold data
    bestSellingBooks() {
      const filtered = this.processedProducts.filter((p) => Number(p.countSold ?? 0) > 10)
      // Fallback: if no books with countSold > 10, return top rated books
      if (filtered.length === 0) {
        return [...this.processedProducts].sort((a, b) => b.rating - a.rating).slice(0, 20)
      }
      return filtered
    },

    // Keep discountedProducts as alias for backward compatibility
    discountedProducts() {
      return this.processedProducts
    },

    genresWithCount(state) {
      return state.genres.map((genre) => {
        const match = state.genreCounts.find((g) => g.genre_id === genre.id)
        return {
          ...genre,
          total: match ? Number(match.total) : 0,
        }
      })
    },
  },

  actions: {
    async fetchGenres() {
      try {
        const res = await axios.get('http://localhost:3000/genres')
        this.genres = res.data
      } catch (error) {
        console.error('Failed to fetch genres:', error)
      }
    },

    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/products')
        this.products = res.data
        return res.data
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    },

    async fetchPromotions() {
      try {
        const res = await axios.get('http://localhost:3000/promotions')
        this.promotions = res.data
      } catch (error) {
        console.error('Failed to fetch promotions:', error)
      }
    },

    async fetchGenreCounts() {
      try {
        const res = await axios.get('http://localhost:3000/product_genres/count')
        this.genreCounts = res.data
      } catch (error) {
        console.error('Failed to fetch GenreCounts:', error)
      }
    },

    async fetchNewArrivals() {
      try {
        const res = await axios.get('http://localhost:3000/new-arrivals')
        this.newArrivals = res.data
      } catch (error) {
        console.error('Failed to fetch new arrivals:', error)
      }
    },

    async fetchRecommendation() {
      try {
        const res = await axios.get('http://localhost:3000/recommendations')
        this.Recommendations = res.data
      } catch (error) {
        console.error('Failed to fetch recommendation:', error)
      }
    },
  },
})
