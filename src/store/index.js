/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import productsModules from './products'
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true, // Vuex 嚴謹模式
    state: {
        isLoading: false,
        cart: {
            carts: [],
        },
    },
    actions: { // 可以做非同步行為
        updateLoading(context, payload) {
            context.commit('LOADING', payload);
        },
        getCart(context) {
            // vm.$store.state.isLoading = true;
            context.commit('LOADING', true);
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            axios.get(url).then((response) => {
                if (response.data.data.carts) {
                    // vm.cart = response.data.data;
                    context.commit('CARTS', response.data.data);
                }
                context.commit('LOADING', false);
                console.log('取得購物車', response.data.data);
            });
        },
        removeCart(context, id) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            context.commit('LOADING', true);
            axios.delete(url).then((response) => {
                context.commit('LOADING', false);
                // vm.getCart();
                context.dispatch('getCart');
                console.log('刪除購物車項目', response);
            });
        },
        addtoCart(context, { id, qty }) {
            console.log(context, id, qty);
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit('LOADING', true);
            const item = {
                product_id: id,
                qty,
            };
            context.commit('LOADING', true);
            axios.post(url, { data: item }).then((response) => {
                context.commit('LOADING', false);
                context.dispatch('getCart');
                console.log('加入購物車:', response);
            });
        }
    },
    mutations: {// 盡量使用大寫 
        // 不要做非同步行為(ajax 之類的)
        LOADING(state, payload) {
            state.isLoading = payload;
        },
        PRODUCTS(state, payload) {
            state.products = payload;
        },
        CARTS(state, payload) {
            state.cart = payload;
        }
    },
    getters: {
    },
    modules:{
        productsModules,
    }
});