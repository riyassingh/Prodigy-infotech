import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";

function ForgotPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // On mount, extract email from location or fallback (e.g., localStorage)
  useEffect(() => {
    if (state?.email) {
      setEmail(state.email);
    } else {
      const storedEmail = localStorage.getItem("resetEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        alert("Email not found. Redirecting to login.");
        navigate("/login");
      }
    }
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postData("/user/reset-password", { email, newPassword });
      if (res.message === "Password reset successful") {
        alert("Password reset successfully! Please log in.");
        localStorage.removeItem("resetEmail"); // cleanup
        navigate("/login");
      } else {
        alert(res.message || "Password reset failed.");
      }
    } catch (err) {
      console.error("Reset error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Your Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Reset Password
        </button>
      </form>
    </section>
  );
}

export default ForgotPassword;
