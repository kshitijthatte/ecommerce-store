import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AdminDashBoard from "../user/AdminDashBoard";
import { isAuthenticated } from "./helper";
import {
  getAllCategoies,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    error: "",
    createdProduct: "",
    formData: "",
  });
  const {
    name,
    description,
    price,
    stock,
    categories,
    photo,
    category,
    error,
    createdProduct,
    formData,
  } = values;
  const [didRedirect, setdidRedirect] = useState(false);

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.data && data.data.error) {
        setValues({ ...values, error: data.data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getAllCategoies().then((data) => {
      if (data.data && data.data.error) {
        setValues({ ...values, error: data.data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.data && data.data.error) {
          setValues({ ...values, error: data.data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
          setTimeout(() => {
            setdidRedirect(true);
          }, 5000);
        }
      }
    );
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <p
        className="mb-3 text-center font-medium text-lg text-green-600"
        style={{ display: createdProduct ? "" : "none" }}
      >
        {createdProduct} was updated sucessfully.
      </p>
    );
  };

  const errorMessage = () => {
    return (
      <p
        className="mb-3 text-center font-medium text-lg text-red-600"
        style={{ display: error ? "" : "none" }}
      >
        Error : {error}
      </p>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/admin/products" />;
    }
  };

  const newProductForm = () => {
    return (
      <div className="border-t border-gray-200">
        <form>
          <div className="px-4 py-5 bg-gray-50 sm:p-6">
            {successMessage()}
            {errorMessage()}
            {performRedirect()}
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange("name")}
                  value={name}
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={handleChange("category")}
                  value={category}
                >
                  <option>Select Category</option>
                  {categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Product Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={handleChange("description")}
                  value={description}
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={handleChange("price")}
                  value={price}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={handleChange("stock")}
                  value={stock}
                />
              </div>
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 bg-white border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer mx-auto rounded-md font-medium text-deep-purple-accent-400 hover:text-deep-purple-accent-700 focus-within:outline-none">
                        {(photo && photo.name) || "Upload a file "}
                        <input
                          name="photo"
                          type="file"
                          accept="image"
                          className="sr-only"
                          onChange={handleChange("photo")}
                          placeholder="choose a file"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-4 py-5 sm:px-6">
            <button
              onClick={onSubmit}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <AdminDashBoard>
      <>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-bold text-gray-900">
            Update A Product
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-700">
            Update the details for the T-Shirt
          </p>
        </div>
        {newProductForm()}
      </>
    </AdminDashBoard>
  );
};

export default UpdateProduct;
