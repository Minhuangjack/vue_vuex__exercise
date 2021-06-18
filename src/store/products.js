import axios from 'axios';

export default {
  // state 屬於模組區域變數
  // actions, mulations, getters 屬於全域變數
  namespaced: true, // 此時actions, mulations, getters 屬於區域變數
  state: {
    products: [],
    categories: [],
  },
  actions: { // 可以做非同步行為
    getProducts(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      // vm.$store.state.isLoading = true;
      // vm.$store.dispatch('updateLoading', true);
      context.commit('LOADING', true, { root: true }); // , {root:true} 讀取 GLOBAL(index.js) 的 LOADING
      axios.get(url).then((response) => {
        // vm.products = response.data.products;
        context.commit('PRODUCTS', response.data.products);
        context.commit('CATEGORIES', response.data.products);
        console.log('取得產品列表:', response);
        // vm.getUnique();
        // vm.$store.state.isLoading = false;
        // vm.$store.dispatch('updateLoading', false);
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    // 盡量使用大寫
    // 不要做非同步行為(ajax 之類的)
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
  },
  getters: {
    categories(state) {
      return state.categories;
    },
    products(state) {
      return state.products;
    },
  },
};
