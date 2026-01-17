import { useState } from "react";
import api from "../services/api";

const AdminAddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "NORMAL_USER",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const validateForm = () => {
    if (form.name.length < 20 || form.name.length > 60) {
      return "Name must be between 20 and 60 characters";
    }

    if (form.address.length > 400) {
      return "Address must not exceed 400 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Invalid email format";
    }

    if (
      !/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(form.password)
    ) {
      return "Password must be 8–16 characters, include one uppercase letter and one special character";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post("/auth/register", form);
      alert("User added successfully");

      setForm({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "NORMAL_USER",
      });
      setError("");
    } catch (err) {
      setError("Failed to add user");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name (20–60 characters)"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <textarea
          name="address"
          placeholder="Address (max 400 characters)"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="NORMAL_USER">Normal User</option>
          <option value="SYSTEM_ADMIN">Admin</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AdminAddUser;
