import { useEffect, useState } from "react";
import api from "../services/api.js";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    const res = await api.get(
      `/admin/users?search=${search}&role=${role}`
    );
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [search, role]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

     
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search name/email/address"
          className="border px-3 py-2 rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="NORMAL_USER">Normal</option>
          <option value="SYSTEM_ADMIN">Admin</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
              <td>
                {u.role === "STORE_OWNER"
                  ? u.store_rating ?? "No ratings"
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
