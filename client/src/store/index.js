import Vue from "vue";
import Vuex from "vuex";
import authModule from "./modules/auth";
import benchModule from "./modules/bench";

Vue.use(Vuex);

const store = new Vuex.Store({
  global: {},
  modules: {
    auth: authModule,
    bench: benchModule,
  },
});

export default store;
