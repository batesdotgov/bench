import Vue from "vue";
import Router from "vue-router";
import HomeComponent from "@/components/HomeComponent";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import BenchItemForm from "@/components/BenchItemForm";

Vue.use(Router);

const routes = [
  { path: "/", component: HomeComponent },
  {
    path: "/login",
    component: LoginForm
  },
  {
    path: "/register",
    component: RegisterForm
  },
  {
    path: "/new",
    component: BenchItemForm
  },
  {
    path: "/edit/:item_id",
    component: BenchItemForm
  }
];

export default new Router({ routes, mode: "history" });
