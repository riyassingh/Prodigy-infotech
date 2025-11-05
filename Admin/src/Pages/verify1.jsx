import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Checking your token...");
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/verify/${token}?check=true`);
        const data = await res.json();

        if (res.ok) {
          setTokenValid(true);
          setMessage(" Token is valid. Click below to verify your email.");
        } else {
          setTokenValid(false);
          setMessage(data.message || " Invalid or expired token.");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        setMessage("Something went wrong while checking the token.");
      } finally {
        setLoading(false);
      }
    };

    if (token) checkToken();
  }, [token]);

  const handleVerify = async () => {
    setMessage("Verifying your email...");
    try {
      const res = await fetch(`http://localhost:5000/api/admin/verify/${token}`, {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Email verified! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setMessage(data.message || "Email verification failed.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setMessage(" Something went wrong during verification.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-red-100">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Email Verification</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        {tokenValid && !loading && (
          <button
            onClick={handleVerify}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >
            Verify Email
          </button>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
