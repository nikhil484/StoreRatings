import { useEffect, useState } from "react";
import api from "../services/api.js";

const AdminStores = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStores = async () => {
    try {
      const res = await api.get(`/admin/stores?search=${search}`);
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores");
    }
  };

  useEffect(() => {
    fetchStores();
  }, [search]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stores</h1>

      <input
        placeholder="Search name / owner email / address"
        className="border px-3 py-2 rounded w-1/2 mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th>Name</th>
            <th>Owner Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id} className="border-b">
              <td>{s.name}</td>
              <td>{s.owner_email ?? "Unassigned"}</td>
              <td>{s.address}</td>
              <td>{s.avg_rating ?? "No ratings"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStores;
