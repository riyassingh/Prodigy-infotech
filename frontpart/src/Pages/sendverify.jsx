import { useState } from "react";

function SendVerificationEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage("Sending verification email...");

    try {
      const res = await fetch("http://localhost:5000/api/user/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Verification email sent successfully!");
      } else {
        setMessage(`❌ ${data.message || "Failed to send email"}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("⚠️ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-orange-100">
      <form onSubmit={handleSend} className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Verification Email</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send Email
        </button>
        {message && <p className="text-gray-700 mt-4">{message}</p>}
      </form>
    </div>
  );
}

export default SendVerificationEmail;
