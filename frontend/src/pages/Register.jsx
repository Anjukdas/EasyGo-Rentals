import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            alert("Register successful");
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleRegister} className="p-6 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-2 mb-3"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;