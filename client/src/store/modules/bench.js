import axios from "axios";
import { BASE_URL } from "@/store/helpers";

const benchModule = {
  namespaced: true,
  state: {
    pending: false,
    list: [],
    error: null,
  },
  mutations: {
    setList: (state, list) => {
      state.list = list;
      state.error = false;
      state.pending = false;
    },
    setError: (state, err) => {
      state.error = err;
    },
  },
  actions: {
    fetch: ({ commit }) => {
      return new Promise(() => {
        axios({ url: `${BASE_URL}/bench-items`, method: "GET" })
          .then((res) => {
            commit("setList", res.data);
          })
          .catch((err) => {
            commit("setError", err.response.data.msg);
          });
      });
    },
  },
  getters: {},
};

export default benchModule;
