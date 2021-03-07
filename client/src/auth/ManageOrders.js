import React, { useState, useEffect } from "react";
import { isAuthenticated } from "./helper";
import {
  getAllOrders,
  getOrderStatusList,
  updateOrderStatus,
} from "./helper/adminapicall";
import AdminDashBoard from "../user/AdminDashBoard";

const { user, token } = isAuthenticated();

const Order = ({ index, order }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [updatedStatus, setUpdatedStatus] = useState(order.status);
  const [statusList, setStatusList] = useState([]);

  const [viewMore, setViewMore] = useState(false);

  const preload = () => {
    getOrderStatusList(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusList(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const successMessage = () => {
    if (success) {
      return (
        <p className="pb-2 font-medium text-md text-green-600 col-span-6 sm:col-span-6">
          Status Updated
        </p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <p className="pb-2 font-medium text-md text-red-600 col-span-6 sm:col-span-6">
          Status Update Failed
        </p>
      );
    }
  };

  const onSubmit = (orderId) => (event) => {
    event.preventDefault();
    console.log(orderId, status);

    updateOrderStatus(user._id, token, orderId, status).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setUpdatedStatus(status);
        setSuccess(true);
      }
    });
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div
      key={index}
      className={`px-4 py-5 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } sm:p-6 grid grid-cols-6 gap-2`}
    >
      <div className="py-2 text-md font-medium text-gray-700 col-span-6 sm:col-span-2">
        User Name : {order.user.name}
      </div>
      <div className="py-2 text-md font-medium text-gray-700 col-span-3 sm:col-span-2">
        {new Date(order.createdAt).toLocaleDateString("en-IN", {
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
          {updatedStatus || order.status}
        </span>
      </div>
      <div className="py-2 text-md font-medium text-gray-700 col-span-6 sm:col-span-2">
        Total Order Ammont : ₹{order.amount}
      </div>
      <div className="py-2 col-span-5 sm:col-span-3 md:col-span-2">
        <button
          className="py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
          onClick={() => setViewMore(!viewMore)}
        >
          {viewMore ? "View Less" : "View More"}
        </button>
      </div>
      {viewMore && (
        <>
          <div className="py-2 text-md font-medium text-gray-700 col-span-6 sm:col-span-6">
            Order ID : {order._id}
            <br />
            Transaction ID : {order.transaction_id}
          </div>
          <div className="py-2 text-md font-medium text-gray-700 col-span-6 sm:col-span-6">
            {order.products.map((product, index) => (
              <div
                key={index}
                className="py-2 text-md font-medium text-gray-700 col-span-2 sm:col-span-2"
              >
                • {product.name} X {product.count}
              </div>
            ))}
          </div>
          {successMessage()}
          {errorMessage()}

          <div className="text-md font-medium text-gray-700 col-span-3 sm:col-span-2">
            Status :{" "}
            <select
              name="category"
              className="bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={handleChange}
              value={status}
            >
              {statusList &&
                statusList.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
            </select>
          </div>
          <div className="text-md font-medium text-gray-700 flex items-end col-span-3 sm:col-span-2">
            <button
              className="py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              onClick={onSubmit(order._id, status)}
            >
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
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

  return (
    <AdminDashBoard>
      <>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-bold text-gray-900">
            Manage Orders
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-700">
            View or Update the status of the orders
          </p>
        </div>
        <div className="border-t border-gray-200">
          {orders.map((order, index) => (
            <Order order={order} index={index} />
          ))}
        </div>
      </>
    </AdminDashBoard>
  );
};

export default ManageOrders;
