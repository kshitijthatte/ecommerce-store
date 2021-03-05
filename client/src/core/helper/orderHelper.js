import { API } from "../../backend";
import axios from "axios";

export const createOrder = (userId, token, orderData) => {
  return axios
    .post(
      `${API}/order/create/${userId}`,
      { order: orderData },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((err) => err.response);
};
