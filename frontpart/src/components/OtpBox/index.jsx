import React, { useState, useRef, useEffect } from 'react';

function OtpBox({ length = 6, onChange }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    onChange(otp.join("")); // Send full OTP string to parent
  }, [otp, onChange]);

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={value}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          maxLength={1}
          className="w-10 h-10 text-center text-lg border-2 border-gray-300 rounded focus:outline-none focus:border-pink-500"
        />
      ))}
    </div>
  );
}

export default OtpBox;
