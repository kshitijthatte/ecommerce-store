import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Nav from "../core/Nav";

const UserDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();
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
              User Information
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

export default UserDashBoard;
