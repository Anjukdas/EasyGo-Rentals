import { useEffect, useState } from "react";
import axios from "axios";

const UserManage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`/api/users/${id}`);
    fetchUsers();
  };

  const changeRole = async (id, role) => {
    await axios.put(`/api/users/${id}`, { role });
    fetchUsers();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td className="flex gap-2">
                <button
                  onClick={() =>
                    changeRole(user._id, user.role === "admin" ? "user" : "admin")
                  }
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Toggle Role
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManage;