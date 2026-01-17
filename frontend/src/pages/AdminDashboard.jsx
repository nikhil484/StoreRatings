
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaStore,
  FaStar,
  FaUserPlus,
  FaPlusCircle,
  FaListAlt,
  FaStoreAlt,
} from "react-icons/fa";
import api from "../services/api.js";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load admin stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-10">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, System Administrator 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Manage users, stores, and ratings — all at your fingertips.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <FaUsers size={24} />
          </div>
          <div>
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <FaStore size={24} />
          </div>
          <div>
            <p className="text-gray-500">Total Stores</p>
            <h2 className="text-3xl font-bold">{stats.totalStores}</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <FaStar size={24} />
          </div>
          <div>
            <p className="text-gray-500">Total Ratings</p>
            <h2 className="text-3xl font-bold">{stats.totalRatings}</h2>
          </div>
        </div>
      </div>


      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/admin/add-user")}
            className="flex items-center gap-3 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <FaUserPlus />
            Add User
          </button>

          <button
            onClick={() => navigate("/admin/add-store")}
            className="flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
          >
            <FaPlusCircle />
            Add Store
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="flex items-center gap-3 bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            <FaListAlt />
            View Users
          </button>

          <button
            onClick={() => navigate("/admin/stores")}
            className="flex items-center gap-3 bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            <FaStoreAlt />
            View Stores
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
