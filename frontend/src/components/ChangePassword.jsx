import { useState } from "react";
import api from "../services/api";

const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.put("/auth/change-password", {
        userId: user.id,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      setSuccess(res.data.message);
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
