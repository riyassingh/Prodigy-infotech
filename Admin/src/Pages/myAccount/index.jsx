import React, { useState, useEffect, useContext } from "react";
import {
  FaUser, FaBox, FaHeart, FaSignOutAlt,
  FaCog, FaMapMarkerAlt, FaCreditCard, FaEdit, FaCamera
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import defaultImg from "../../assets/user1.png";
import { AuthContext } from "../../App";

const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("admin"))?.token;
  return { Authorization: `Bearer ${token}` };
};

const MyAccount = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContext);

  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    avatar: "",
    address: {
      addressLine: "",
      city: "",
      state: "",
      country: "",
      pincode: ""
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/me", {
          headers: getAuthHeader(),
        });

        const data = res.data;
        setUserId(data._id);
        setUserInfo({
          name: data.fullname,
          email: data.email,
          phone: data.mobile || "",
          gender: data.gender || "",
          avatar: data.avatar || "",
          address: data.address ? {
            addressLine: data.address.addressLine || "",
            city: data.address.city || "",
            state: data.address.state || "",
            country: data.address.country || "",
            pincode: data.address.pincode || "",
          } : {
            addressLine: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
          }
        });
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      }
    }));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInfo.email)) {
        alert("Please enter a valid email.");
        return;
      }

      try {
        const res = await axios.patch(
          `http://localhost:5000/api/admin/update-profile/${userId}`,
          {
            fullname: userInfo.name,
            email: userInfo.email,
            mobile: userInfo.phone,
            gender: userInfo.gender,
            address: userInfo.address,
          },
          { headers: getAuthHeader() }
        );

        alert("✅ Profile updated successfully!");
      } catch (err) {
        console.error("Update failed", err);
        alert(err.response?.data?.message || "❌ Failed to update profile.");
      }
    }

    setIsEditing(!isEditing);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:5000/api/admin/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...getAuthHeader(),
          },
        }
      );

      setUserInfo((prev) => ({
        ...prev,
        avatar: `${res.data.avatar}?t=${Date.now()}`,
      }));
    } catch (err) {
      console.error("Upload failed", err);
      alert("❌ Avatar upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/logout",
        {},
        { headers: getAuthHeader() }
      );
      setIsLogin(false);
    } catch (err) {
      console.warn("⚠️ Logout failed on backend");
    } finally {
      localStorage.removeItem("admin");
      navigate("/");
    }
  };

  return (
    <section className="py-10 w-full flex justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-md p-5">
          <div className="flex flex-col items-center border-b pb-4 relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden relative group">
              <img
                src={userInfo.avatar || defaultImg}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow group-hover:opacity-100 opacity-0 transition-opacity">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            {loading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            <h2 className="mt-3 text-lg font-semibold">{userInfo.name}</h2>
            <p className="text-gray-500">{userInfo.email}</p>
          </div>

          <nav className="mt-4">
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaUser /> My Profile
              </li>
              <Link to="/Order">
                <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                  <FaBox /> My Orders
                </li>
              </Link>
              <Link to="/wishList">
                <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                  <FaHeart /> Wishlist
                </li>
              </Link>
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaMapMarkerAlt /> Saved Addresses
              </li>
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaCreditCard /> Payment Methods
              </li>
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaCog /> Settings
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
              >
                <FaSignOutAlt /> Logout
              </li>
            </ul>
          </nav>
        </div>

        <div className="w-full md:w-2/3 bg-white shadow-md rounded-md p-5">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-semibold">My Profile</h2>
            <button onClick={toggleEdit} className="text-blue-500 flex items-center gap-2">
              <FaEdit /> {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600">Email:</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600">Phone:</label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600">Gender:</label>
              <select
                name="gender"
                value={userInfo.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-gray-600">Address Line:</label>
              <input
                type="text"
                name="addressLine"
                value={userInfo.address.addressLine}
                onChange={handleAddressChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">City:</label>
                <input
                  type="text"
                  name="city"
                  value={userInfo.address.city}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-gray-600">State:</label>
                <input
                  type="text"
                  name="state"
                  value={userInfo.address.state}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={userInfo.address.country}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-gray-600">Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={userInfo.address.pincode}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
