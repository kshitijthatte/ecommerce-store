import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "../auth/helper/adminapicall";
import AdminDashBoard from "./AdminDashBoard";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError(false);
    setCategoryName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    createCategory(user._id, token, { name: categoryName })
      .then((data) => {
        if (data.data && data.data.error) {
          setError(data.data.error);
        } else {
          setError(false);
          setSuccess(true);
          setCategoryName("");
          setTimeout(() => setSuccess(false), 5000);
        }
      })
      .catch((err) => {
        console.log("Error while creating a category", err);
      });
  };

  const successMessage = () => {
    if (success) {
      return (
        <p className="mt-2 font-medium text-md text-green-600">
          {/* <span className="text-deep-purple-accent-400">{categoryName}</span> */}
          Category created sucessfully
        </p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <p className="mt-2 font-medium text-md text-red-600">
          Failed to create new category
        </p>
      );
    }
  };

  const newCategoryForm = () => {
    return (
      <div className="border-t border-gray-200">
        <form>
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <label className="text-sm font-medium text-gray-700">
              Enter the category name
            </label>
            {successMessage()}
            {errorMessage()}
          </div>
          <div className="bg-gray-50 px-4 pb-5 sm:px-6">
            <input
              type="text"
              className="w-3/4 bg-white rounded border border-gray-300 focus:border-deep-purple-accent-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
              placeholder="For Ex. Summer"
              onChange={handleChange}
              value={categoryName}
            />
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

  return (
    <AdminDashBoard>
      <>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-bold text-gray-900">
            Create a New Category
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-700">
            Add a new category for the T-shirts here
          </p>
        </div>
        {newCategoryForm()}
      </>
    </AdminDashBoard>
  );
};

export default AddCategory;
