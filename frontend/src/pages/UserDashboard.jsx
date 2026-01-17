import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStore, FaStar, FaKey } from "react-icons/fa";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6">
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to StoreRatings
        </h1>
        <p className="text-gray-600 mt-1">
          <span className="font-semibold">Help others choose better—rate shops you know.</span>
        </p>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-center gap-4">
          <FaStore className="text-blue-600 text-3xl" />
          <div>
            <p className="text-sm text-gray-600">Available Stores</p>
            <p className="text-2xl font-bold text-gray-800">Browse & Rate</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-center gap-4">
          <FaStar className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-sm text-gray-600">Your Ratings</p>
            <p className="text-2xl font-bold text-gray-800">View History</p>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/user/stores")}
          className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-6"
        >
          <FaStore className="text-blue-600 text-2xl mb-3" />
          <h3 className="text-lg font-semibold mb-1">Browse Stores</h3>
          <p className="text-gray-600 text-sm">
            View all registered stores and submit ratings.
          </p>
        </div>

        <div
          onClick={() => navigate("/user/ratings")}
          className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-6"
        >
          <FaStar className="text-yellow-500 text-2xl mb-3" />
          <h3 className="text-lg font-semibold mb-1">My Ratings</h3>
          <p className="text-gray-600 text-sm">
            See and update the ratings you’ve submitted.
          </p>
        </div>

        <div
          onClick={() => navigate("/change-password")}
          className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-6"
        >
          <FaKey className="text-gray-700 text-2xl mb-3" />
          <h3 className="text-lg font-semibold mb-1">Change Password</h3>
          <p className="text-gray-600 text-sm">
            Update your account password securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
