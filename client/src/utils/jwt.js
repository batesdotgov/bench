import jwt_decode from "jwt-decode";

export const tokenIsValid = (providedToken) => {
  let token;
  const tokenInStorage = getToken();
  let isExpiredToken = false;
  if (!providedToken && !tokenInStorage) return false;

  token = tokenInStorage || providedToken;

  try {
    const decodedToken = jwt_decode(token);
    const dateNow = new Date();
    if (decodedToken.exp > dateNow.getTime() / 1000) {
      isExpiredToken = true;
    }
    return isExpiredToken;
  } catch (e) {
    localStorage.removeItem("access_token");
    return isExpiredToken;
  }
};

export const getToken = () => localStorage.getItem("access_token");
