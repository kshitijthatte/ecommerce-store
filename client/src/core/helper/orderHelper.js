import { API } from "../../backend";
import axios from "axios";

export const createOrder = (userId, token, orderData) => {
  return axios
    .post(`${API}/category/create/${userId}`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response);
};
