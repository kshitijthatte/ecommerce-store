import { API } from "../../backend";
import axios from "axios";

// category calls
export const createCategory = (userId, token, category) => {
  return axios
    .post(`${API}/category/create/${userId}`, category, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response);
};

// get all categories
export const getAllCategoies = () => {
  return axios
    .get(`${API}/categories`)
    .then((response) => response.data)
    .catch((err) => err.response);
};

// get a category
export const getCategory = (categoryId) => {
  return axios
    .get(`${API}/category/${categoryId}`)
    .then((response) => response.data)
    .catch((err) => err.response);
};

// update a category
export const updateCategory = (categoryId, userId, token, category) => {
  return axios
    .put(`${API}/category/${categoryId}/${userId}`, category, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response);
};

//delete a category
export const deleteCategory = (categoryId, userId, token) => {
  return axios
    .delete(`${API}/category/${categoryId}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response);
};

// product calls
export const createProduct = (userId, token, product) => {
  return axios
    .post(`${API}/product/create/${userId}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response);
};

// get all products
export const getAllProducts = () => {
  return axios
    .get(`${API}/products`)
    .then((response) => response.data)
    .catch((err) => err.response);
};

// get a product
export const getProduct = (productId) => {
  return axios
    .get(`${API}/product/${productId}`)
    .then((response) => response.data)
    .catch((err) => err.response);
};

// update a product
export const updateProduct = (productId, userId, token, product) => {
  return axios
    .put(`${API}/product/${productId}/${userId}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response);
};

//delete a product
export const deleteProduct = (productId, userId, token) => {
  return axios
    .delete(`${API}/product/${productId}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response);
};

//get all orders
export const getAllOrders = (userId, token) => {
  return axios
    .get(`${API}/order/all/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};
