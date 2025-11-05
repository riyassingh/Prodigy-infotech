import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { RiMenuFold2Fill } from "react-icons/ri";
import { MdNotifications } from "react-icons/md";
import { FiUser, FiSettings, FiLogOut, FiHome, FiUsers } from "react-icons/fi";
import img from "../../assets/woman.png";
import img1 from "../../assets/logo.png";
import Button from "@mui/material/Button";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 5px",
    backgroundColor: "#FF3D3D",
    color: "white",
  },
}));

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLogin, setIsLogin, userInfo, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToMyAccount = () => navigate("/myaccount");
  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/signup");

 const handleLogout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("No token found, you are already logged out.");
    setIsLogin(false);
    navigate("/login");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/admin/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,  // important: "Bearer " + token
      },
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok) {
      throw new Error(data.message || "Logout failed");
    }

    alert("Logged out successfully!");
  } catch (err) {
    console.warn("Logout failed on backend:", err.message);
    alert(`Logout failed: ${err.message}`);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("adminInfo");
    setIsLogin(false);
    navigate("/login");
  }
};

  return (
    <header className="w-full h-20 bg-white shadow-md flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left Section - Logo and Menu */}
      <div className="flex items-center gap-4">
        <img src={img1} alt="Logo" className="w-full h-16 object-contain" />
        <IconButton className="p-0 w-auto h-auto" size="small">
          <RiMenuFold2Fill className="text-[24px] text-gray-700 hover:text-[#FF3D3D]" onClick={()=>navigate('/')} />
        </IconButton>
      </div>

      {/* Right Section */}
      <div className="relative flex items-center gap-6">
        <IconButton aria-label="notifications" className="p-0 w-auto h-auto">
          <StyledBadge badgeContent={4}>
            <MdNotifications className="text-[24px] text-gray-700" />
          </StyledBadge>
        </IconButton>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : isLogin ? (
          <div className="relative">
            <img
              src={img}
              alt="Admin Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-4 z-50">
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate("/")}
                >
                  <FiHome className="text-gray-600" /> Dashboard
                </button>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate("/users")}
                >
                  <FiUsers className="text-gray-600" /> Manage Users
                </button>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={goToMyAccount}
                >
                  <FiUser className="text-gray-600" /> Profile
                </button>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => alert("Settings coming soon!")}
                >
                  <FiSettings className="text-gray-600" /> Settings
                </button>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-gray-600" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="contained"
              className="!bg-[#FF3D3D] !text-white hover:!bg-white hover:!text-[#FF3D3D] transition-colors duration-300"
              onClick={goToLogin}
            >
              Login
            </Button>
            <Button
              variant="contained"
              className="!bg-[#FF3D3D] !text-white hover:!bg-white hover:!text-[#FF3D3D] transition-colors duration-300"
              onClick={goToRegister}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
