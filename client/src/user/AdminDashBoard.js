import React from "react";
import { Link } from "react-router-dom";
import Nav from "../core/Nav";

const AdminDashBoard = ({ children }) => {
  const adminNavigation = () => (
    <div className="flex flex-col w-full md:w-72 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
      <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="text-xl font-bold tracking-wide text-gray-800 uppercase"
        >
          Admin Dashboard
        </Link>
      </div>
      <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
        <Link
          className="block px-4 py-2 mt-2 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
          to="/admin/create/category"
        >
          Create Categories
        </Link>
        <Link
          className="block px-4 py-2 mt-2 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
          to="/admin/create/product"
        >
          Create Products
        </Link>
        <Link
          className="block px-4 py-2 mt-2 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
          to="/admin/products"
        >
          Manage Products
        </Link>
        <Link
          className="block px-4 py-2 mt-2 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
          to="/admin/orders"
        >
          Manage Orders
        </Link>
      </nav>
    </div>
  );
  return (
    <>
      <Nav />
      <div className="md:flex flex-col md:flex-row w-full">
        {adminNavigation()}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mr-8 mt-2 w-5/6">
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
