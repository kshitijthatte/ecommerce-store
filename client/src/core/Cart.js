import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import {
  loadCart,
  removeItemFromCart,
  changeCountInCart,
  getAmount,
} from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <>
      <Nav></Nav>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mx-auto mt-2 mb-6 w-5/6">
        <div className="px-8 py-10 ">
          <h3 className="text-lg leading-6 font-bold text-gray-900">
            Shopping Cart
          </h3>
        </div>
        <div className="md:grid md:grid-cols-3 gap-2 w-full bg-gray-50 rounded p-4 px-3 py-5">
          <div className="col-span-2 p-5">
            {products.length === 0 && (
              <p className="font-medium text-md text-center text-gray-800 pb-8">
                <span>Your cart is empty! </span>
                <span className="block">Add items to it now.</span>
              </p>
            )}
            {products.map((product, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center mb-6 pb-6 flex-wrap"
                >
                  <div className="flex items-center ">
                    <ImageHelper
                      product={product}
                      className={"rounded-full w-16 h-16"}
                    />
                    <div className="flex flex-col ml-3 flex-auto">
                      <span className="md:text-md font-medium">
                        {product.name}
                      </span>
                      <span className="text-xs uppercase text-gray-400">
                        {product.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end items-center mt-1 flex-auto">
                    <div className="pr-8 flex">
                      <button
                        onClick={() => {
                          changeCountInCart(product._id, "-");
                          setReload(!reload);
                        }}
                        className="font-semibold focus:outline-none"
                      >
                        -
                      </button>
                      <span className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2">
                        {product.count}
                      </span>
                      <button
                        onClick={() => {
                          changeCountInCart(product._id);
                          setReload(!reload);
                        }}
                        className="font-semibold focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <span className="text-md font-medium pr-8">
                        ₹{product.price}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload);
                      }}
                      className="text-red-400 hover:text-red-700 focus:outline-none"
                    >
                      <svg width="24" viewBox="0 0 64 58.67">
                        <path
                          fill="currentcolor"
                          d="M61.33,5.33H48V2.67A2.66,2.66,0,0,0,45.33,0H18.67A2.66,2.66,0,0,0,16,2.67V5.33H2.67a2.67,2.67,0,0,0,0,5.34H8v40a8,8,0,0,0,8,8H48a8,8,0,0,0,8-8v-40h5.33a2.67,2.67,0,1,0,0-5.34ZM50.67,50.67A2.67,2.67,0,0,1,48,53.33H16a2.67,2.67,0,0,1-2.67-2.66v-40H50.67Z"
                        />
                        <path
                          fill="currentcolor"
                          d="M24,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,24,45.33Z"
                        />
                        <path
                          fill="currentcolor"
                          d="M40,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,40,45.33Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between items-center border-t pt-6">
              <div className="flex items-center">
                <a
                  href="/#products"
                  className="text-md font-medium text-deep-purple-accent-400 hover:text-deep-purple-accent-700"
                >
                  Continue Shopping
                </a>
              </div>
              <div className="flex justify-center items-end">
                <span className="text-lg font-medium text-gray-400 mr-1">
                  Subtotal:
                </span>
                <span className="text-lg font-bold text-gray-800">
                  {" "}
                  ₹{getAmount()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
