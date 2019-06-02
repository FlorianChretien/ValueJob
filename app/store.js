import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    user: {}
  },
  getters: {
    isConnected: state => state.isConnected,
    user: state => state.user
  },
  mutations: {
    UPDATE_IS_CONNECTED (state, value) {
      state.isConnected = value;
    },
    STORE_USER (state, value) {
      state.user = value;
    }
  },
  actions: {
    updateIsConnected ({ commit }, value) {
      commit('UPDATE_IS_CONNECTED', value)
    },
    storeUser ({ commit }, value) {
      commit('STORE_USER', value)
    }
  }
});
