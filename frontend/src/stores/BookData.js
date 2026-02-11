import { defineStore } from 'pinia';
import axios from 'axios';

export const useBookStore = defineStore('book', {
  state: () => ({
    products: [],
    genres: [],
    genreCounts:[],
    promotions: [],
  }),

  getters: {
    
    discountedProducts(state) {
      return state.products.map((p) => {
        const now = new Date();
        const price = Number(p.price);
        
        // Find active promotions for this product (% Off and Sale types apply discount)
        const applicablePromotions = state.promotions.filter((promo) => {
          const promoStart = new Date(promo.startDate);
          const promoEnd = new Date(promo.endDate);
          const isActive = now >= promoStart && now <= promoEnd;
          const hasProduct = promo.products?.some((prod) => prod.id === p.id) || 
                             promo.books?.includes(p.id);
          // Include both "Sale" (fixed) and "% Off" (percentage) but not "Hot Badge"
          return isActive && hasProduct && (promo.type === '% Off' || promo.type === 'Sale');
        });

        // Calculate best discount (use the one that saves the most money)
        let discountValue = 0;
        let discountType = 'percentage';
        let bestPromotion = null;
        
        if (applicablePromotions.length > 0) {
          // For each promotion, calculate the actual dollar savings
          const discountAmounts = applicablePromotions.map((promo) => {
            const promoDiscount = Number(promo.discount); // Convert string to number
            if (promo.type === '% Off') {
              // Percentage discount: calculate dollar amount saved
              return {
                amount: (price * promoDiscount) / 100,
                discount: promoDiscount,
                type: 'percentage',
                promo: promo,
              };
            } else if (promo.type === 'Sale') {
              // Fixed price discount: already in dollars
              return {
                amount: promoDiscount,
                discount: promoDiscount,
                type: 'fixed',
                promo: promo,
              };
            }
          }).filter(Boolean); // Remove undefined entries
          
          if (discountAmounts.length > 0) {
            // Pick the promotion that saves the most money
            bestPromotion = discountAmounts.reduce((max, current) => 
              current.amount > max.amount ? current : max
            );
            
            discountValue = bestPromotion.discount;
            discountType = bestPromotion.type;
          }
        }

        // Calculate final price based on discount type
        let finalPrice = price;
        if (discountValue > 0) {
          if (discountType === 'percentage') {
            finalPrice = price - (price * discountValue) / 100;
          } else if (discountType === 'fixed') {
            finalPrice = Math.max(0, price - discountValue);
          }
        }

        // Check for Hot Badge promotion and get custom badge text
        const hotBadgePromo = state.promotions.find((promo) => {
          const promoStart = new Date(promo.startDate);
          const promoEnd = new Date(promo.endDate);
          const isActive = now >= promoStart && now <= promoEnd;
          const hasProduct = promo.products?.some((prod) => prod.id === p.id) || 
                             promo.books?.includes(p.id);
          return isActive && hasProduct && promo.type === 'Hot Badge';
        });
        const hasHotBadge = !!hotBadgePromo;
        const hotBadgeText = hotBadgePromo?.badgeText || '🔥 HOT';

        // Check for Buy 1 Get 1 promotion
        const hasBuy1Get1 = state.promotions.some((promo) => {
          const promoStart = new Date(promo.startDate);
          const promoEnd = new Date(promo.endDate);
          const isActive = now >= promoStart && now <= promoEnd;
          const hasProduct = promo.products?.some((prod) => prod.id === p.id) || 
                             promo.books?.includes(p.id);
          return isActive && hasProduct && promo.type === 'Buy 1 Get 1';
        });

        return {
          ...p,
          // convert strings to numbers for Vue props
          price: price,
          discount: discountValue, // Store discount amount/percentage
          discountType: discountType, // Store the type for display purposes
          rating: Number(p.rating ?? 0),
          inStock: Number(p.inStock),
          pages: Number(p.pages),
          finalPrice: finalPrice,
          genreIds: p.genres?.map((g) => g.id) || [],
          hasHotBadge: hasHotBadge, // Hot badge flag
          hotBadgeText: hotBadgeText, // Custom hot badge text
          hasBuy1Get1: hasBuy1Get1, // Buy 1 Get 1 flag
        };
      });
    },

    genresWithCount(state) {
      return state.genres.map((genre) => {
        const match = state.genreCounts.find(
          (g) => g.genre_id === genre.id
        );

        return {
          ...genre,
          total: match ? Number(match.total) : 0,
        };
      });
    },
  },

  actions: {
    async fetchGenres() {
      try {
        const res = await axios.get('http://localhost:3000/genres');
        this.genres = res.data;
        console.log('Genres fetched successfully');
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    },

    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/products');
        this.products = res.data;
        console.log('Products fetched successfully');
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    },

    async fetchPromotions() {
      try {
        const res = await axios.get('http://localhost:3000/promotions');
        this.promotions = res.data;
        console.log('Promotions fetched successfully');
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
      }
    },

    // NEW: fetch the join table
    async fetchGenreCounts() {
      try{
        const res = await axios.get(
        'http://localhost:3000/product_genres/count'
      );
      this.genreCounts = res.data;
      console.log('GenreCounts fetched successfully');
      }catch (error) {
        console.error('Failed to fetch GenreCounts:', error);
      }
    },
  },
});
