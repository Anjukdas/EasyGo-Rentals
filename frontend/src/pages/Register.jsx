import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        const newErrors = {};

        // Name Validation
        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        // Email Validation
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = "Please enter a valid email";
            }
        }

        // Password Validation
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Stop if validation fails
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clear previous errors
        setErrors({});

        try {
            setLoading(true);
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
                    value={name}
                    className="w-full border p-2"
                    onChange={(e) => setName(e.target.value)}
                />

                {errors.name && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.name}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="w-full border p-2"
                    onChange={(e) => setEmail(e.target.value)}
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.email}
                    </p>
                )}

                <div className="relative">

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 pr-10 rounded"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                </div>

                {errors.password && (
                    <p className="text-red-500 text-sm mt-1 mb-3">
                        {errors.password}
                    </p>
                )}

               

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 ${loading
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Registering...
                        </div>
                    ) : (
                        "Register"
                    )}
                </button>
            </form>
        </div>
    );
};

export default Register;