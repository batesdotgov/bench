import axios from "axios";
import { BASE_URL } from "@/store/helpers";

const benchModule = {
  namespaced: true,
  state: {
    pending: false,
    list: [],
    error: [],
  },
  mutations: {
    setList: (state, list) => {
      state.list = list;
      state.error = false;
      state.pending = false;
    },
  },
  actions: {
    fetch: ({ commit }) => {
      return new Promise(() => {
        axios({ url: `${BASE_URL}/bench-items`, method: "GET" })
          .then((res) => {
            console.log(res);
            commit("setList", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
  getters: {},
};

export default benchModule;
