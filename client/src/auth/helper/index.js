import { API } from "../../backend";
import axios from "axios";

export const signup = (user) => {
  return axios
    .post(`${API}/signup`, user)
    .then((response) => response.data)
    .catch((err) => err.response);
};

export const signin = (user) => {
  return axios
    .post(`${API}/signin`, user)
    .then((response) => response.data)
    .catch((err) => err.response);
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return axios
      .get(`${API}/signout`)
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
