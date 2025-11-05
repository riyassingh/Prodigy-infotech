import React, { useState, useEffect, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { postData } from "/src/utils/api.js";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContext);

  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    setRememberMe(savedRememberMe);
    if (savedRememberMe) {
      const savedEmail = localStorage.getItem("email");
      if (savedEmail) setFormData((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    const newRememberMe = !rememberMe;
    setRememberMe(newRememberMe);
    localStorage.setItem("rememberMe", newRememberMe);
    if (!newRememberMe) localStorage.removeItem("email");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("/user/login", formData);
      if (response?.token) {
        if (rememberMe) localStorage.setItem("email", formData.email);
        localStorage.setItem("token", response.token);
        setIsLogin(true);
        alert("Login successful!");
        navigate("/");
      } else {
        alert(response.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 to-red-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600">Please login to your account</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium">Password</label>
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg pr-10" required />
            <button type="button" className="absolute top-9 right-3 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={rememberMe} onChange={handleCheckboxChange} />
              <span>Remember me</span>
            </label>
            <Link to="/verify" state={{ email: formData.email }} className="text-[#f56666] hover:underline">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="w-full bg-[#f56666] text-white py-3 rounded-lg hover:bg-[#f35555]">Login</button>
        </form>
        <div className="flex items-center justify-center my-4">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
          <FcGoogle size={24} className="mr-2" /> Continue with Google
        </button>
        <p className="text-center text-gray-600">
          Don’t have an account? <Link to="/signup" className="text-[#f56666] hover:underline">Sign up</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
