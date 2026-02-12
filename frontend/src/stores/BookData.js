import { defineStore } from 'pinia';
import axios from 'axios';

export const useBookStore = defineStore('book', {
  state: () => ({
    products: [],
    genres: [],
    genreCounts:[],
    newArrivals: [],
    Recommendations: [],
  }),

  getters: {

  recommendationProducts(state){
    return state.Recommendations.map((na) => {
      const p = na.product

      return{
        ...p,
        price: Number(p.price),
        discount: Number(p.discount ?? 0),
        rating: Number(p.rating ?? 0),
        finalPrice:
          Number(p.price) - 
            (Number(p.price)  * Number(p.discount ?? 0)) / 100,
      }
    })
  },

  newArrivalProducts(state) {
    return state.newArrivals.map((na) => {
      const p = na.product

      return {
        ...p,
        price: Number(p.price),
        discount: Number(p.discount ?? 0),
        rating: Number(p.rating ?? 0),
        finalPrice:
          Number(p.price) -
          (Number(p.price) * Number(p.discount ?? 0)) / 100,
      }
    })
  },

  bestSellingBooks(state){
    return state.products
      .filter(p => Number(p.countSold ?? 0) > 10)
      .map(p => ({
        ...p,
        price: Number(p.price),
        discount: Number (p.discount ?? 0),
        rating: Number(p.rating ?? 0),
        finalPrice:
          Number(p.price) - (Number(p.price) * Number(p.discount ?? 0)) / 100,
      }))
  },
  
  discountedProducts(state) {
    return state.products.map((p) => ({
       ...p,
      // convert strings to numbers for Vue props
      price: Number(p.price),
      discount: Number(p.discount ?? 0),
      rating: Number(p.rating ?? 0),
      inStock: Number(p.inStock),
      pages: Number(p.pages),
      finalPrice: Number(p.price) - (Number(p.price) * Number(p.discount ?? 0)) / 100,
      genreIds: p.genres?.map((g) => g.id) || [],
    }));
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
        const res = await axios.get('http://localhost:3000/products')
        this.products = res.data
        return res.data
      } catch (error) {
        console.error('Failed to fetch products:', error)
        throw error
      }
    },

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

    async fetchNewArrivals() {
      try {
        const res = await axios.get('http://localhost:3000/new-arrivals')
        this.newArrivals = res.data
        console.log('New arrivals fetched successfully')
      } catch (error) {
        console.error('Failed to fetch new arrivals:', error)
      }
    },
    async fetchRecommendation() {
      try {
        const res = await axios.get('http://localhost:3000/recommendations')
        this.Recommendations = res.data 
        console.log('Recommendation fetched successfully')
      } catch (error) {
        console.error('Failed to fetch recommendation:', error)
      }
    }

  },
});
