import React, { useState,useContext } from "react";
import {FiHome,FiUsers,FiSettings,
  FiLogOut,FiGrid,FiShoppingCart,FiPackage,FiChevronDown,FiChevronUp,FiList,FiUpload,FiHardDrive,FiBox,
  FiMaximize2,
  FiTag,
  FiLayers,
  FiFolder,
} from "react-icons/fi";
import { DialogContext } from "../../App";
import ProductUploader from "../../Pages/Products/addProducts";
import CategoryUpload from "../../Pages/AddCategory/categoryUpload";
import SubCategory from "../../Pages/AddCategory/SubCategory";
import AddCategory from "../../Pages/AddCategory/addCategory";
import { useNavigate } from "react-router-dom";
import AdminCategoryManager from "../../Pages/categoryList";
import ProductList from "../../Pages/productList/productlist";

function Sidebar() {
  const navigate = useNavigate();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { openDialog } = useContext(DialogContext);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const getItemClass = (item) =>
    `flex items-center gap-3 text-md p-2 rounded-md cursor-pointer ${
      selectedItem === item ? "bg-gray-300" : "hover:bg-gray-100"
    }`;

  return (
    <div className="fixed top-0 left-0 w-[18%] h-screen bg-white shadow-md p-6">
      <ul className="space-y-4 text-gray-700">
        <li
          className={`flex items-center justify-between text-lg p-2 rounded-md cursor-pointer ${
            selectedItem === "Dashboard" ? "bg-gray-300" : "hover:bg-gray-100"
          }`}
          onClick={() => handleSelect("Dashboard")}
        >
          <span className="flex items-center gap-3">
            <FiHome /> Dashboard
          </span>
        </li>
        <li
          className={`flex items-center justify-between text-lg p-2 rounded-md cursor-pointer ${
            selectedItem === "Users" ? "bg-gray-300" : "hover:bg-gray-100"
          }`}
          onClick={() => handleSelect("Users")}
        >
          <span className="flex items-center gap-3">
            <FiUsers /> Users
          </span>
        </li>
        <li>
          <div
            className="flex items-center justify-between text-lg p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <span className="flex items-center gap-3">
              <FiGrid /> Categories
            </span>{" "}
            {categoryOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {categoryOpen && (
            <ul className="pl-6 space-y-2">
              <li
                className={getItemClass("Category List")}
                onClick={() => navigate("/categoryList")}
               
              >
                <FiTag /> Category List
              </li>
              <li
                className={getItemClass("Category Upload")}
                onClick={() => navigate("/addCategory")}
              >
                <FiUpload /> Category Upload
              </li>
              <li
                className={getItemClass("Subcategories")}
                onClick={() => openDialog(<SubCategory/>)}
              >
                <FiLayers /> Subcategories
              </li>
              <li
                className={getItemClass("Category Archives")}
                onClick={() => handleSelect("Category Archives")}
              >
                <FiFolder /> Category Archives
              </li>
            </ul>
          )}
        </li>
        <li
          className={`flex items-center justify-between text-lg p-2 rounded-md cursor-pointer ${
            selectedItem === "Orders" ? "bg-gray-300" : "hover:bg-gray-100"
          }`}
          onClick={() => handleSelect("Orders")}
        >
          <span className="flex items-center gap-3">
            <FiShoppingCart /> Orders
          </span>
        </li>
        <li>
          <div
            className="flex items-center justify-between text-lg p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={() => setProductsOpen(!productsOpen)}
          >
            <span className="flex items-center gap-3">
              <FiPackage /> Products
            </span>{" "}
            {productsOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {productsOpen && (
            <ul className="pl-6 space-y-2">
              <li
                className={getItemClass("Product List")}
                onClick={() => navigate("/productList")}
                
              >
                <FiList /> Product List
              </li>
              <li
                className={getItemClass("Product Upload")}
              
                  
                onClick={() => openDialog(<ProductUploader />)}
              >
                <FiUpload /> Product Upload
              </li>
              <li
                className={getItemClass("Product RAMs")}
                onClick={() => handleSelect("Product RAMs")}
              >
                <FiHardDrive /> Product RAMs
              </li>
              <li
                className={getItemClass("Product Weight")}
                onClick={() => handleSelect("Product Weight")}
              >
                <FiBox /> Product Weight
              </li>
              <li
                className={getItemClass("Product Size")}
                onClick={() => handleSelect("Product Size")}
              >
                <FiMaximize2 /> Product Size
              </li>
            </ul>
          )}
        </li>
        <li
          className={`flex items-center justify-between text-lg p-2 rounded-md cursor-pointer ${
            selectedItem === "Settings" ? "bg-gray-300" : "hover:bg-gray-100"
          }`}
          onClick={() => handleSelect("Settings")}
        >
          <span className="flex items-center gap-3">
            <FiSettings /> Settings
          </span>
        </li>
        <li
          className={`flex items-center justify-between text-lg p-2 rounded-md cursor-pointer ${
            selectedItem === "Logout" ? "bg-gray-300" : "hover:bg-gray-100"
          }`}
          onClick={() => handleSelect("Logout")}
        >
          <span className="flex items-center gap-3">
            <FiLogOut /> Logout
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
