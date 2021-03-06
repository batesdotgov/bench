import Vue from "vue";
import Router from "vue-router";

// store
import store from "@/store";

// Components
import HomePage from "@/components/HomePage";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import BenchItemForm from "@/components/BenchItemForm";

// register router
Vue.use(Router);

const authCheck = (to, from, next) => {
  console.log(store.getters);
  if (store.getters["auth/isLoggedIn"]) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    component: HomePage,
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
    path: "/edit/:id",
    name: "edit",
    component: BenchItemForm,
    beforeEnter: authCheck,
  },
];

const router = new Router({ routes, mode: "history" });

export default router;
