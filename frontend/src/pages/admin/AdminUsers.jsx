import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
        try {

            const res = await axios.get(
                "http://localhost:5000/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUsers(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        await axios.delete(
            `http://localhost:5000/api/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchUsers();
    };

    const changeRole = async (id, role) => {

        await axios.put(
            `http://localhost:5000/api/users/${id}/role`,
            { role },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchUsers();
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-5">
                Manage Users
            </h1>

            <input
                type="text"
                placeholder="Search user..."
                className="border p-2 rounded w-80 mb-5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="w-full border">

                <thead className="bg-gray-200">

                    <tr>

                        <th className="p-3">Name</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredUsers.map((user) => (

                        <tr
                            key={user._id}
                            className="border-b text-center"
                        >

                            <td className="p-3">
                                {user.name}
                            </td>

                            <td>{user.email}</td>

                            <td>

                                <span
                                    className={`px-3 py-1 rounded text-white ${
                                        user.role === "admin"
                                            ? "bg-green-600"
                                            : "bg-blue-500"
                                    }`}
                                >
                                    {user.role}
                                </span>

                            </td>

                            <td className="space-x-2">

                                <button
                                    onClick={() =>
                                        changeRole(
                                            user._id,
                                            user.role === "admin"
                                                ? "user"
                                                : "admin"
                                        )
                                    }
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Change Role
                                </button>

                                <button
                                    onClick={() =>
                                        deleteUser(user._id)
                                    }
                                    className="bg-red-600 text-white px-3 py-1 rounded"
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

export default AdminUsers;