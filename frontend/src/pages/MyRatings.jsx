import { useEffect, useState } from "react";
import api from "../services/api";

const MyRatings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRatings = async () => {
    try {
      const res = await api.get(`/ratings/user/${user.id}`);
      setRatings(res.data);
    } catch (error) {
      console.error("Failed to fetch ratings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRatings();
  }, []);

  const updateRating = async (storeId, newRating) => {
    try {
      await api.post("/ratings", {
        user_id: user.id,
        store_id: storeId,
        rating: Number(newRating),
      });

      alert("Rating updated");
      fetchMyRatings();
    } catch (error) {
      alert("Failed to update rating");
    }
  };

  if (loading) {
    return <p className="p-6">Loading your ratings...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Ratings</h1>

      {ratings.length === 0 ? (
        <p className="text-gray-600">
          You haven’t rated any stores yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ratings.map((item) => (
            <div
              key={item.store_id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                {item.store_name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {item.address}
              </p>

              <p className="mb-2">
                Your Rating:{" "}
                <span className="font-bold">
                  {item.rating}
                </span>
              </p>

              <select
                value={item.rating}
                onChange={(e) =>
                  updateRating(item.store_id, e.target.value)
                }
                className="border rounded-md px-2 py-1 w-full"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRatings;
