import axios from "axios";
import { setUserAuth, BASE_URL } from "@/store/helpers";

const authModule = {
  namespaced: true,
  state: {
    token: false,
    user: null,
    error: null,
    pending: null,
  },
  mutations: {
    logout(state) {
      state.token = false;
      state.user = null;
    },
    auth_success: (state, data) => {
      state.token = data.token;
      state.user = data?.user;
      state.pending = false;
    },

    auth_error: (state, error) => {
      state.error = error;
      state.pending = false;
    },
    auth_request: (state) => {
      state.pending = true;
    },
  },
  actions: {
    login: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({ url: `${BASE_URL}/login`, data: user, method: "POST" })
          .then((resp) => {
            setUserAuth(resp.data.token);
            commit("auth_success", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err.message);
            localStorage.removeItem("access_token");
            reject(err?.response?.data?.msg);
          });
      });
    },
    register: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({ url: `${BASE_URL}/register`, data: user, method: "POST" })
          .then((resp) => {
            setUserAuth(resp.data.token);
            commit("auth_success", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err.message);
            localStorage.removeItem("access_token");
            reject(err?.response?.data?.msg);
          });
      });
    },
    logout: ({ commit }) => {
      commit("logout");
      localStorage.removeItem("access_token");
      return new Promise((resolve) => resolve());
    },
    set_auth: ({ commit }, token) => {
      commit("auth_success", { token });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    authPending: (state) => state.status === "pending",
  },
};

export default authModule;
