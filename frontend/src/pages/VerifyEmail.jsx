import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState(false);

  useEffect(() => {
    const alreadyVerified = sessionStorage.getItem("emailVerified");

    if (alreadyVerified === "true") {
      setMessage("🎉 Your email is already verified successfully!");
      return;
    }
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/verify/${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setMessage(data.message || "Email verification failed");
          return;
        }
        sessionStorage.setItem("emailVerified", "true");

        setMessage(
          `🎉 Welcome to EasyGo Rentals, ${data.name}! Your email has been verified successfully.`
        );
      } catch (err) {
        setError(true);
        setMessage("Something went wrong. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center p-6">
      
      <h2 className="text-2xl font-bold mb-4">
        {error ? "Verification Failed" : "Email Verification"}
      </h2>

      <p className="mb-6">
        {message}
      </p>

      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Go to Login
      </button>

    </div>
  </div>
);
};

export default VerifyEmail;