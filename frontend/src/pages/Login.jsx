import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            // ✅ SAVE TOKEN
            localStorage.setItem("token", data.token);

            // ✅ SAVE USER (IMPORTANT FIX)
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful");
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="p-6 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

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

                <button className="w-full bg-green-600 text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;