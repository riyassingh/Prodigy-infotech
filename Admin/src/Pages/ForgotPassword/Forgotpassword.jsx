import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Handle Password Reset
  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      alert("Please enter a new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Password reset successfully! Please log in.");
    navigate("/login");
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Reset Password
        </h2>
        <p className="text-center text-gray-600">
          Enter your email and set a new password
        </p>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-400 text-white py-3 rounded-lg hover:bg-red-500 transition duration-200 font-medium shadow-md"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
