import { API } from "../../backend";
import axios from "axios";

export const createCategory = (userId, token, category) => {
  return axios
    .post(`${API}/category/create/${userId}`, category, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response);
};
