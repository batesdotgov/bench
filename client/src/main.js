import Vue from "vue";
import "reset-css";
import axios from "axios";
import Vuelidate from "vuelidate";

import App from "./App.vue";
import router from "@/router";
import store from "@/store/store";
import "@/assets/styles/global.scss";

const token = localStorage.getItem("user-token");

if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
