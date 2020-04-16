import axios from "axios";

export const setUserAuth = (token) => {
  localStorage.setItem("access_token", token);
  axios.defaults.headers.common["Authorization"] = token;
};
