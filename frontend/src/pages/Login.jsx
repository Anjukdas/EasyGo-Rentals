import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {

    // const navigate = useNavigate();
    // 1. URL search params edukkunnu
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/"; // 👈 'redirect' param illeghil '/' (home) aavum fallback


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "Email is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            newErrors.email = "Invalid email";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
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
            // Admin → Admin Dashboard
            if (data.user.role === "admin") {
                window.location.href = "/admin";
            } else {
                // Normal user
                window.location.href = redirectUrl;
            }
            // window.location.reload();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="p-6 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

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
                            Logging in...
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
        </div>
    );
};

export default Login;