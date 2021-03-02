import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ImageHelper from "./helper/ImageHelper";
import { getAllProducts } from "../auth/helper/adminapicall";
import { addItemToCart } from "./helper/cartHelper";

const Products = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(product.count);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.data && data.data.error) {
        setError(data.data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const addToCart = (product) => {
    addItemToCart(product, () => setRedirect(true));
  };

  const performRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product, index) => {
            return (
              <div key={index} className="p-4 md:w-1/3">
                {performRedirect()}
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <ImageHelper
                    product={product}
                    className={
                      "lg:h-48 md:h-36 w-full object-cover object-center"
                    }
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium uppercase text-gray-400 mb-1">
                      {product.category.name}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 ">
                      {product.name}
                    </h1>
                    <p className="leading-relaxed mb-3">₹{product.price}</p>
                    <div className="flex items-center flex-wrap ">
                      <button
                        onClick={() => addToCart(product)}
                        className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
