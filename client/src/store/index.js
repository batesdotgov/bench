import Vue from "vue";
import Vuex from "vuex";
import authModule from "./modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  global: {},
  modules: {
    auth: authModule,
  },
});

export default store;
