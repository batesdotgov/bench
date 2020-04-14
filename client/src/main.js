import Vue from "vue";
import "reset-css";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/global.scss";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
