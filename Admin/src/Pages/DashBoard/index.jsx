import React ,{useContext,useEffect}from "react";
import DashCom from "../../Components/DashCom";
import img1 from "../../assets/onlineshop.png";
import Button from "@mui/material/Button";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useState,PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  ComposedChart, Bar,Area,Scatter,} from "recharts";
  import { DialogContext } from "../../App";
  import AddProducts from "../Products/addProducts";

const itemsPerPage = 4;
import axios from "axios";

const userSalesData = [
  { name: "Jan", totalUsers: 480, totalSales: 11500 },
  { name: "Feb", totalUsers: 720, totalSales: 15200 },
  { name: "Mar", totalUsers: 880, totalSales: 17500 },
  { name: "Apr", totalUsers: 1050, totalSales: 22000 },
  { name: "May", totalUsers: 1400, totalSales: 24000 },
  { name: "Jun", totalUsers: 1350, totalSales: 27000 },
  { name: "Jul", totalUsers: 1750, totalSales: 31000 },
];

function DashBoard() {
  const userSalesData1 = [
    { name: "Jan", totalUsers: 480, totalSales: 11500 },
    { name: "Feb", totalUsers: 720, totalSales: 15200 },
    { name: "Mar", totalUsers: 880, totalSales: 17500 },
    { name: "Apr", totalUsers: 1050, totalSales: 22000 },
    { name: "May", totalUsers: 1400, totalSales: 24000 },
    { name: "Jun", totalUsers: 1350, totalSales: 27000 },
    { name: "Jul", totalUsers: 1750, totalSales: 31000 },
  ];
   const { openDialog } = useContext(DialogContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/get", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (res.status === 200 && res.data) {
        setProducts(res.data); // ✅ FIXED: res.data instead of res.data.products
      } else if (res.status === 304) {
        console.log("Data not modified, using previous state.");
      }

      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch products.");
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  const getCategoryLabel = (cat) => {
    if (!cat) return "Unknown";
    if (typeof cat === "object" && cat.name) return cat.name;
    return String(cat); // fallback for ObjectId string
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => getCategoryLabel(p.category) === selectedCategory);

  const categories = ["All", ...new Set(products.map((p) => getCategoryLabel(p.category)))];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <div className="ml-[300px] text-xl font-semibold">Loading products...</div>;
  if (error) return <div className="ml-[300px] text-red-600 font-semibold">{error}</div>;

  
  return (
    <>
<div className="w-510px p-5 border border-gray-700 flex items-center justify-center mb-5 ml-[300px] mr-4">
  <div className="info w-full flex items-center justify-between">
    {/* Left Side Content */}
    <div className="flex flex-col space-y-5 max-w-[65%]">
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white leading-snug">
          Hi, Good Morning<br />
          <span className="text-blue-600 dark:text-blue-400">👋 User</span>
        </h1>
        <img
          src="https://cdn-icons-gif.flaticon.com/11321/11321431.gif"
          alt="wave"
          className="w-14 h-14 animate-bounce"
        />
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Here's what's happening on your store today. Stay updated with your total sales!
      </p>

      <Button className="w-fit text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300 transform hover:scale-105 hover:text-gray-100">
        + Add Product
      </Button>
    </div>

    {/* Right Side GIF */}
    <img
      src="https://cdn-icons-gif.flaticon.com/17905/17905666.gif"
      alt="Analytics"
      className="w-[200px] h-[200px] ml-4"
    />
  </div>
</div>





      <div className=" ml-[300px] mr-4">
      <DashCom />

      </div>



<div className="card my-3 p-4 bg-white shadow-lg rounded-lg ml-[300px] mr-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-gray-700">Product Management</div>
        <div className="flex space-x-4">
          <select
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Export</button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => openDialog(<AddProducts />, "Add New Product")}
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">
                <input type="checkbox" className="w-4 h-4 text-blue-600" />
              </th>
              <th className="px-6 py-3">Product Details</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-4">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                </td>
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <a
                      href={`/product/${product._id}`}
                      className="text-lg font-semibold text-gray-800 hover:text-red-500"
                    >
                      {product.name}
                    </a>
                    <p className="text-sm text-gray-500">
                      ID: {product._id} • {product.brand}
                    </p>
                    <p className="text-sm text-gray-600">
                      ⭐ {product.ratings} ({product.reviews?.length || 0} reviews)
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">{getCategoryLabel(product.category)}</td>
                <td
                  className={`px-6 py-4 ${
                    product.stock > 5
                      ? "text-green-500"
                      : product.stock > 0
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {product.stock > 5
                    ? "In Stock"
                    : product.stock > 0
                    ? "Low Stock"
                    : "Out of Stock"}
                </td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4 text-center flex justify-center space-x-4">
                  <button className="text-green-500 hover:text-green-700" title="View Details">
                    <FaEye size={18} />
                  </button>
                  <button className="text-blue-500 hover:text-blue-700" title="Edit">
                    <FaEdit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" title="Delete">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>



  
      <div className="card my-3 p-4 bg-white shadow-lg rounded-lg  ml-[300px] mr-4">
      <div className="flex items-center justify-between mb-4 text-lg font-semibold text-gray-700">
        Recent Orders
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Product ID</th>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Color</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <a href="/order/101" className="text-blue-500 hover:underline">101</a>
              </td>
              <td className="px-6 py-4">
                <a href="/product/501" className="text-blue-500 hover:underline">501</a>
              </td>
              <td className="px-6 py-4">Smartphone</td>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Electronics</td>
              <td className="px-6 py-4">$699</td>
              <td className="px-6 py-4 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <a href="/order/102" className="text-blue-500 hover:underline">102</a>
              </td>
              <td className="px-6 py-4">
                <a href="/product/502" className="text-blue-500 hover:underline">502</a>
              </td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Computers</td>
              <td className="px-6 py-4">$1199</td>
              <td className="px-6 py-4 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <a href="/order/103" className="text-blue-500 hover:underline">103</a>
              </td>
              <td className="px-6 py-4">
                <a href="/product/503" className="text-blue-500 hover:underline">503</a>
              </td>
              <td className="px-6 py-4">Headphones</td>
              <td className="px-6 py-4">Blue</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$199</td>
              <td className="px-6 py-4 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <a href="/order/104" className="text-blue-500 hover:underline">104</a>
              </td>
              <td className="px-6 py-4">
                <a href="/product/504" className="text-blue-500 hover:underline">504</a>
              </td>
              <td className="px-6 py-4">Smartwatch</td>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Wearables</td>
              <td className="px-6 py-4">$299</td>
              <td className="px-6 py-4 text-center">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
  

    <div className="p-4 bg-white rounded-xl shadow-md  ml-[300px] mr-4">
      <h2 className="text-lg font-semibold mb-4">Total Users vs Total Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={userSalesData1} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="totalUsers" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>


    <div className="p-4 bg-white rounded-xl shadow-md  ml-[300px] mr-4">
      <h2 className="text-lg font-semibold mb-4">Total Users vs Total Sales</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={userSalesData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="totalSales" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="totalSales" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="totalUsers" stroke="#ff7300" />
          <Scatter dataKey="cnt" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
   
    </>
  );
}

export default DashBoard;