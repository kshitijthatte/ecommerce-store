import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Nav from "../core/Nav";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

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

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mr-8 mt-2">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-bold text-gray-900">
              Admin Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-700">
              Personal Details
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-700">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {name}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-700">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {email}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-700">About</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                  incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                  consequat sint. Sit id mollit nulla mollit nostrud in ea
                  officia proident. Irure nostrud pariatur mollit ad adipisicing
                  reprehenderit deserunt qui eu.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
