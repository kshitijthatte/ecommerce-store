import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminDashBoard from "../user/AdminDashBoard";
import { isAuthenticated } from "./helper";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.data && data.data.error) {
        console.log(data.data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <AdminDashBoard>
      <>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-bold text-gray-900">
            Manage Products
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-700">
            Update or Delete the existing T-Shirts in the store
          </p>
        </div>
        <div className="border-t border-gray-200">
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className={`px-4 py-5 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } sm:p-6 grid grid-cols-6 gap-6`}
              >
                <div className="py-2 text-md font-medium text-gray-700 col-span-6 sm:col-span-3">
                  {product.name}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Link
                    className="py-2 px-4 mr-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                  <button
                    onClick={() => deleteThisProduct(product._id)}
                    className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-700 focus:shadow-outline focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    </AdminDashBoard>
  );
};

export default ManageProducts;
