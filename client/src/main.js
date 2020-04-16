import Vue from "vue";
import axios from "axios";
import Vuelidate from "vuelidate";

// styles
import "reset-css";
import "@/assets/styles/global.scss";

// config
import App from "@/App.vue";
import router from "@/routes/router";
import store from "@/store";
import { tokenIsValid } from "./utils/jwt";

Vue.prototype.$http = axios;

if (tokenIsValid()) {
  const token = localStorage.getItem("access_token");
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
  store.dispatch("auth/set_auth", token);
}

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
