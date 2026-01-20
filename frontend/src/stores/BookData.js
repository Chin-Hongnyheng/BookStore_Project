import { defineStore } from 'pinia';
import axios from 'axios';

export const useBookStore = defineStore('book', {
  state: () => ({
    products: [],
    genres: [],
    genreCounts:[],
  }),

  getters: {
    
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
        const res = await axios.get('http://localhost:3000/products');
        this.products = res.data;
        console.log('Products fetched successfully');
      } catch (error) {
        console.error('Failed to fetch products:', error);
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
