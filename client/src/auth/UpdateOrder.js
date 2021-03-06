import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./helper";
import { getAllOrders } from "./helper/adminapicall";
import AdminDashBoard from "../user/AdminDashBoard";

const UpdateOrder = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const successMessage = () => {
    if (success) {
      return (
        <p className="pt-2 font-medium text-md text-center bg-gray-50 text-green-600">
          Order Status Updated
        </p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <p className="pt-2 font-medium text-md text-center bg-gray-50 text-red-600">
          Status Updated Failed
        </p>
      );
    }
  };

  return (
    <AdminDashBoard>
      <>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-bold text-gray-900">
            Update Order
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-700">
            Update the status of the order
          </p>
        </div>
        <div className="border-t border-gray-200">
          {successMessage()}
          {errorMessage()}
          {orders.map((order, index) => {
            const date = new Date(order.createdAt);
            return (
              <div
                key={index}
                className={`px-4 py-5 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } sm:p-6 grid grid-cols-6 gap-2`}
              >
                <div className="py-2 text-md font-medium text-gray-700 col-span-2 sm:col-span-2">
                  {order.user.name}
                </div>
                <div className="py-2 text-md font-medium text-gray-700 col-span-2 sm:col-span-2">
                  {order.products.length > 1
                    ? `${order.products.length} products`
                    : order.products[0].name}
                </div>
                <div className="py-2 text-md font-medium text-gray-700 col-span-1 sm:col-span-1">
                  ₹{order.amount}
                </div>
                <div className="py-2 text-md font-medium text-gray-700 col-span-3 sm:col-span-2">
                  {date.toLocaleDateString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="py-2 text-md font-medium text-gray-700 col-span-3 sm:col-span-2">
                  Status :{" "}
                  <span className=" text-deep-purple-accent-400 uppercase">
                    {order.status}
                  </span>
                </div>
                <div className="py-2 col-span-5 sm:col-span-3 md:col-span-2">
                  <Link
                    className="py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    to={`/admin/order/update/${order._id}`}
                  >
                    <span className="">View Or Update Status</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </>
    </AdminDashBoard>
  );
};

export default UpdateOrder;
