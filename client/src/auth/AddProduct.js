import React, { useState } from "react";
import AdminDashBoard from "../user/AdminDashBoard";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const { name, description, price, stock } = values;

  const onSubmit = () => {
    //
  };
  const handleChange = () => {
    //
  };
  const newProductForm = () => {
    return (
      <div className="border-t border-gray-200">
        <form>
          <div class="px-4 py-5 bg-gray-50 sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autocomplete="given-name"
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="category"
                  class="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  autocomplete="category"
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div class="col-span-6">
                <label
                  for="street_address"
                  class="block text-sm font-medium text-gray-700"
                >
                  Product Description
                </label>
                <input
                  type="text"
                  name="street_address"
                  id="street_address"
                  autocomplete="street-address"
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  for="price"
                  class="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  for="quantity"
                  class="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  className="mt-1 w-full bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="col-span-6">
                <label class="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 bg-white border-2 border-gray-300 border-dashed rounded-md">
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="file-upload"
                        className="relative cursor-pointer mx-auto rounded-md font-medium text-deep-purple-accent-400 hover:text-deep-purple-accent-700 focus-within:outline-none"
                      >
                        Upload a file
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                      />
                    </div>
                    <p class="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-4 py-5 sm:px-6">
            <button
              onClick={onSubmit}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  };
  // const newProductForm = () => {
  //   return (
  //     <div className="border-t border-gray-200">
  //       <form>
  //         <div className="bg-gray-50 px-4 py-5 sm:px-6">
  //           <label className="text-sm font-medium text-gray-700">
  //             Enter the Product name
  //           </label>
  //         </div>
  //         <div className="bg-gray-50 px-4 pb-5 sm:px-6">
  //           <input
  //             type="text"
  //             className="w-3/4 bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  //             required
  //             onChange={handleChange}
  //             value={name}
  //           />
  //         </div>

  //         <div className="bg-white px-4 py-5 sm:px-6">
  //           <button
  //             onClick={onSubmit}
  //             className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
  //           >
  //             Save
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };
  return (
    <AdminDashBoard>
      <>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-bold text-gray-900">
            Create a New Product
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-700">
            Add a new T-Shirt to the store
          </p>
        </div>
        {newProductForm()}
      </>
    </AdminDashBoard>
  );
};

export default AddProduct;
