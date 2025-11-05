import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/sheild1.png";
import OtpBox from "../../components/OtpBox";
import { postData } from "../../utils/api";
import { Button } from "@mui/material";

function Verify() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const res = await postData("/user/send-otp", { email });
      if (res.message === "OTP sent to your email") {
        alert("OTP has been sent to your email.");
        setOtpSent(true);
        localStorage.setItem("resetEmail", email); // store for later use
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP.");
      return;
    }

    try {
      const res = await postData("/user/verify-otp", { email, otp });
      if (res.message === "OTP verified successfully") {
        alert("OTP verified! Redirecting to reset password.");
        navigate("/forgot-password", { state: { email } });
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8 transform -translate-y-10">
        <div className="flex justify-center">
          <img src={img} alt="shield" className="w-16" />
        </div>
        <h3 className="text-lg font-semibold text-center mt-4 mb-6 text-gray-700">
          {otpSent ? "Enter the OTP sent to your email" : "Enter your email to receive OTP"}
        </h3>

        {!otpSent ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <Button onClick={handleSendOtp} className="w-full bg-pink-500 text-white py-2 rounded-lg">
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <p className="text-center p-4 text-sm text-gray-500">
              OTP sent to <span className="text-pink-500 font-semibold">{email}</span>
            </p>
            <OtpBox onChange={setOtp} />
            <div className="flex items-center justify-center mt-4">
              <Button onClick={handleVerifyOtp} className="w-full bg-pink-500 text-white py-2 rounded-lg">
                Verify OTP
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Verify;
