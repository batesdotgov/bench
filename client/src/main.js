import Vue from "vue";
import "reset-css";
import axios from "axios";
import Vuelidate from "vuelidate";
import "@/assets/styles/global.scss";
import App from "./App.vue";
import router from "@/routes/router";
import store from "@/store/store";

const token = localStorage.getItem("access_token");

if (token) {
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch("set_auth");
}

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
