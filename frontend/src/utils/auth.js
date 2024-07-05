import cookie from "js-cookie";
import axios from "axios";
import { baseURL } from "./constant";
import { jwtDecode } from "jwt-decode";

export const setCookie = (key, value) => {
  cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};

export const getCookie = (key) => {
  return cookie.get(key);
};

export const setAuthentication = (token) => {
  setCookie("token", token);
};

export const logOut = () => {
  removeCookie("token");
};

export const isLogin = async () => {
  const token = getCookie("token");

  if (token) {
    const res = await axios.post(`${baseURL}/auth`, { token });
    return res.data;
  }
  return false;
};

export const getEmail = () => {
  const token = getCookie("token");
  const decodedToken = jwtDecode(token);
  return decodedToken.email;
};
