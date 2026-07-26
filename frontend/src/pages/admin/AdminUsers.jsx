import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const addUser = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users`,
                newUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("User added successfully");

            setNewUser({
                name: "",
                email: "",
                password: "",
                role: "user",
            });

            fetchUsers();

        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Failed to add user");
        }
    };

    const fetchUsers = async () => {
        try {

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users`,
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
            `${import.meta.env.VITE_API_URL}/api/users/${id}`,
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
            `${import.meta.env.VITE_API_URL}/api/users/${id}/role`,
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

            <h1 className="text-3xl font-bold mb-5 mt-6">
                Manage Users
            </h1>
            <div className="bg-white shadow rounded-lg p-5 mb-6">
    <h2 className="text-xl font-semibold mb-4">
        Add New User
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) =>
                setNewUser({
                    ...newUser,
                    name: e.target.value,
                })
            }
            className="border p-2 rounded"
        />

        <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) =>
                setNewUser({
                    ...newUser,
                    email: e.target.value,
                })
            }
            className="border p-2 rounded"
        />

        <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
                setNewUser({
                    ...newUser,
                    password: e.target.value,
                })
            }
            className="border p-2 rounded"
        />

        <select
            value={newUser.role}
            onChange={(e) =>
                setNewUser({
                    ...newUser,
                    role: e.target.value,
                })
            }
            className="border p-2 rounded"
        >
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>

    </div>

    <button
        onClick={addUser}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
    >
        Add User
    </button>
</div>


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
                                    className={`px-3 py-1 rounded text-white ${user.role === "admin"
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