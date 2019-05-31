import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
  },
  getters: {
    isConnected: state => state.isConnected
  },
  mutations: {
    UPDATE_IS_CONNECTED (state, value) {
      state.isConnected = value;
    }
  },
  actions: {
    updateIsConnected ({ commit, value }) {
      commit('UPDATE_IS_CONNECTED', value)
    }
  }
});
