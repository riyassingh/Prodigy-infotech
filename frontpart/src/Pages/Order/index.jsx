import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBox, FaHeart, FaMapMarkerAlt, FaCreditCard, FaCog, FaSignOutAlt } from 'react-icons/fa';
import img from "../../assets/user1.png";
import img1 from "../../assets/bag.png";
import img2 from "../../assets/Laptop.jpg";

const Order = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    gender: "Male",
    address: "123, Street Name, City, State - 110001"
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const orders = [
    {
      id: "ORD12345",
      date: "March 10, 2025",
      status: "Delivered",
      total: "$120.00",
      items: [
        { name: "Wireless Headphones", price: "$60.00", quantity: 1, image: img1, description: "High-quality noise-canceling wireless headphones." },
        { name: "Smart Watch", price: "$60.00", quantity: 1, image: img2, description: "Feature-packed smartwatch with health tracking." }
      ]
    },
    {
      id: "ORD67890",
      date: "March 5, 2025",
      status: "Shipped",
      total: "$80.00",
      items: [
        { name: "Bluetooth Speaker", price: "$80.00", quantity: 1, image: "../../assets/speaker.png", description: "Portable Bluetooth speaker with deep bass." }
      ]
    }
  ];

  return (
    <section className="py-10 w-full flex justify-center">
      <div className='container mx-auto px-4 flex flex-col md:flex-row gap-6 w-full max-w-5xl'>

        <div className="w-full md:w-1/3 bg-white shadow-md rounded-md p-5">
          <div className="flex flex-col items-center border-b pb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img src={img} alt="User" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-3 text-lg font-semibold">{userInfo.name}</h2>
            <p className="text-gray-500">{userInfo.email}</p>
          </div>
          <nav className="mt-4">
            <ul className="flex flex-col gap-3">
                <Link to='/MyAccount'>
              <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaUser /> My Profile
              </li>
                </Link>
                <Link to={'/Order'}>
              <li className="flex items-center gap-3 p-3 bg-gray-200 rounded-md cursor-pointer">
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
              <li className="flex items-center gap-3 p-3 text-red-500 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaSignOutAlt /> Logout
              </li>
            </ul>
          </nav>
        </div>

        <div className="w-full md:w-2/3 bg-white shadow-md rounded-md p-5">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="border p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Order ID: {order.id}</h3>
                  <span className="text-sm text-gray-600">{order.date}</span>
                </div>
                <p className="text-sm text-gray-500 mb-1">Status: <span className="font-semibold">{order.status}</span></p>
                <p className="text-sm text-gray-500 mb-2">Total: <span className="font-semibold">{order.total}</span></p>
                <div>
                  <h4 className="text-sm font-semibold">Items:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-4 p-2 border rounded-md shadow-sm">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-600">{item.price} (Qty: {item.quantity})</p>
                          <p className="text-gray-500 text-xs">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Order;