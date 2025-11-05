import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../App";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLogin, setUserInfo } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // Load email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", formData);
      const { token, admin } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("adminInfo", JSON.stringify(admin));

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      setIsLogin(true);
      setUserInfo(admin);

      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/admin/google";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 to-red-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg pr-10"
                placeholder="Enter your password"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                Remember Me
              </label>
            </div>

            <Link to="/Verify" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f56666] text-white py-3 rounded-lg hover:bg-[#f35555]"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded transition duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
