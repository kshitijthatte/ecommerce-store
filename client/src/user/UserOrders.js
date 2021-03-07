import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getOrder } from "../core/helper/orderHelper";
import Nav from "../core/Nav";

const UserOrders = () => {
  const { user, token } = isAuthenticated();
  const [orders, setOrders] = useState([]);

  const preload = () => {
    getOrder(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <>
      <Nav />
      <div className="md:flex flex-col md:flex-row w-full">
        <div className="flex flex-col w-full md:w-72 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
          <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <Link
              to="/user/dashboard"
              className="text-xl font-bold tracking-wide text-gray-800 uppercase"
            >
              User Dashboard
            </Link>
          </div>
          <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <Link
              className="block px-4 py-2 mt-2 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              to="/user/update"
            >
              Update Info
            </Link>
            <Link
              className="block px-4 py-2 mt-2 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              to="/user/orders"
            >
              View Orders
            </Link>
          </nav>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mx-8 md:ml-0 mb-8 mt-2 w-5/6">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-bold text-gray-900">
              View Orders
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-700">
              Status of All your previous orders
            </p>
          </div>
          <div className="border-t border-gray-200">
            {orders.length === 0 && (
              <p className="font-medium text-md text-center text-gray-800 py-8">
                <span>Your don't have any orders! </span>
                <span className="block">Start Shopping Now</span>
              </p>
            )}
            {orders.map((order, index) => {
              const date = new Date(order.createdAt);
              return (
                <div
                  key={index}
                  className={`px-4 py-5 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } sm:p-6 grid grid-cols-12 gap-2`}
                >
                  <div className="py-2 text-md font-medium text-gray-700 col-span-12 sm:col-span-4">
                    Order ID : {order._id} {"\n"}
                    Transaction ID : {order.transaction_id}
                  </div>

                  <div className="py-2 text-md font-medium text-gray-700 col-span-8 sm:col-span-3">
                    {date.toLocaleDateString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="py-2 text-md font-medium text-gray-700 col-span-7 sm:col-span-3">
                    Status :{" "}
                    <span className=" text-deep-purple-accent-400 uppercase">
                      {order.status}
                    </span>
                  </div>
                  <div className="py-2 text-md font-medium text-gray-700 col-span-5 sm:col-span-2">
                    Total Order Ammont : ₹{order.amount}
                  </div>

                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="py-2 text-md font-medium text-gray-700 col-span-12 sm:col-span-4"
                    >
                      • {product.name} X {product.count}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
