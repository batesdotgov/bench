import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import HomeComponent from "@/components/HomeComponent";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import BenchItemForm from "@/components/BenchItemForm";

Vue.use(Router);

const authCheck = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    component: HomeComponent,
  },
  {
    path: "/login",
    component: LoginForm,
  },
  {
    path: "/register",
    component: RegisterForm,
  },
  {
    path: "/new",
    component: BenchItemForm,
    beforeEnter: authCheck,
  },
  {
    path: "/edit/:item_id",
    component: BenchItemForm,
    beforeEnter: authCheck,
  },
];

const router = new Router({ routes, mode: "history" });

export default router;
