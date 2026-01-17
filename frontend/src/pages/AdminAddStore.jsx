import { useState } from "react";
import api from "../services/api.js";

const AdminAddStore = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    ownerEmail: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/stores", form);
      alert("Store added successfully");

      setForm({
        name: "",
        address: "",
        ownerEmail: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Add New Store</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
       
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

      
        <textarea
          name="address"
          placeholder="Store Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full"
          rows={3}
          required
        />

        
        <input
          type="email"
          name="ownerEmail"
          placeholder="Store Owner Email"
          value={form.ownerEmail}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AdminAddStore;
