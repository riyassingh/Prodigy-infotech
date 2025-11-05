import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import img from "../../assets/sheild1.png";
import OtpBox from "../../components/OtpBox";
import { Button } from "@mui/material";

function Verify() {
  const location = useLocation();
  const email = location.state?.email || "your email"; // Retrieve email from navigation state
  const [otp, setOtp] = useState("");

  const handleChange = (value) => {
    setOtp(value);
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      alert("OTP Verified Successfully! Redirecting to dashboard.");
      // Navigate to the dashboard after successful OTP verification (Replace with actual navigation)
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8 transform -translate-y-10">
        <div className="flex justify-center">
          <img src={img} alt="shield" className="w-16" />
        </div>
        <h3 className="text-lg font-semibold text-center mt-4 mb-6 text-gray-700">Verify OTP</h3>
        <p className="text-center p-4">
          OTP sent to <span className="text-primary font-bold">{email}</span>
        </p>
        <OtpBox length={6} onChange={handleChange} />

        <div className="flex items-center justify-center mt-4">
          <Button onClick={handleVerify} className="w-full btn-org btn-lg">
            Verify OTP
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Verify;
