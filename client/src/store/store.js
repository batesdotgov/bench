import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: false,
    user: {},
  },
  mutations: {
    logout(state) {
      state.token = false;
    },
    auth_success: (state) => {
      state.token = true;
    },
  },
  actions: {
    login: ({ commit }) => {
      commit("auth_success");
      localStorage.setItem("access_token", "sdfsdfd");
    },
    logout: ({ commit }) => {
      commit("logout");
      return new Promise((resolve) => resolve());
    },
    set_auth: ({ commit }) => {
      commit("auth_success");
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    authPending: (state) => state.status === "pending",
  },
});
