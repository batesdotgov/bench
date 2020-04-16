import axios from "axios";

export const BASE_URL = process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL + "/api" : "/api";

export const setUserAuth = (token) => {
  localStorage.setItem("access_token", token);
  axios.defaults.headers.common["Authorization"] = token;
};
