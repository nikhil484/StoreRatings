import { useEffect, useState } from "react";
import api from "../services/api";
import { FaStar } from "react-icons/fa";

const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDashboard = async () => {
    try {
      const res = await api.get(`/owner/${user.id}`);
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch owner dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
   
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Store Owner Dashboard</h1>
        <p className="text-gray-600">
          View your store performance and customer ratings
        </p>
      </div>

     
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-1">
            {data.storeName}
          </h2>
          <p className="text-gray-500">Your Store</p>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <FaStar className="text-yellow-400 text-xl" />
          <span className="text-xl font-bold">
            {data.avgRating}
          </span>
          <span className="text-gray-500 text-sm">
            average rating
          </span>
        </div>
      </div>

    
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
          Users Who Rated Your Store
        </h3>

        {data.ratings.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            No users have rated your store yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-3">User Name</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Rating</th>
                </tr>
              </thead>

              <tbody>
                {data.ratings.map((r, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 font-medium">
                      {r.name}
                    </td>
                    <td className="py-3 text-gray-600">
                      {r.email}
                    </td>
                    <td className="py-3 flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">
                        {r.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
