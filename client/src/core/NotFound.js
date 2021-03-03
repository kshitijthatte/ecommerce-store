import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const NotFound = () => {
  return (
    <>
      <Nav />
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
            <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
              Oops! The page you're looking for isn't available.
            </h1>
            <Link
              to="/"
              class="flex-shrink-0 text-white bg-deep-purple-accent-400 border-0 py-2 px-8 focus:outline-none hover:bg-deep-purple-accent-700 rounded text-lg mt-10 sm:mt-0"
            >
              Go Back
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
