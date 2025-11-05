import { Button } from '@mui/material';
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GiCommercialAirplane } from "react-icons/gi";
import CategoryPanel from './CategoryPanel';
import './style.css';
import img from '../../../assets/furniture.png'


function Navigation() {
    const [isopenCategory, setopenCategoryPanel] = useState(false);

    const openCategoryPanel = (state) => {
        setopenCategoryPanel(state);
    };

    return (
        <>
            <nav className="py-3 bg-white shadow-md">
                <div className="container flex items-center justify-between px-4 gap-5 flex-wrap md:flex-nowrap">
                    <div className="col_1 w-full md:w-[30%] flex items-center justify-center md:justify-start">
                        <Button
                            className="!text-black flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                            onClick={() => openCategoryPanel(true)}
                        >
                            <IoMenu className="text-[18px]" />
                          Browse Categories
                            <FaAngleDown />
                        </Button>
                    </div>

                    <div className="col_2 w-full md:w-[80%] flex flex-col md:flex-row items-center justify-between">
                         <ul className="flex flex-wrap md:flex-nowrap items-center justify-start gap-6 md:gap-12 w-full md:w-auto !z-[1000]">

      {/* Home */}
      <li className="relative group">
        <Link
          to="/"
          className="link transition hover:text-[#FF3D3D] flex items-center gap-1 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3D3D]"
        >
          Home
        </Link>
      </li>

      {/* Fashion */}
      <li className="relative group">
        <Link
          to="/electronics"
          className="link transition hover:text-[#FF3D3D] flex items-center gap-2 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3D3D]"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src="https://api.spicezgold.com/download/file_1734525204708_fash.png"
            alt="fashion"
            className="w-6 h-6 object-contain"
          />
          <span className="text-gray-700 group-hover:text-[#FF3D3D]">Fashion</span>
        </Link>


        {/* First-Level Dropdown */}
        <div
          className="absolute top-full left-0 min-w-[220px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
          role="menu"
          aria-label="Fashion submenu"
        >
          <ul className="py-2">

            {/* Women Category */}
            <li className="relative group" role="none">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between items-center focus:outline-none focus:bg-gray-200"
                aria-haspopup="true"
                aria-expanded="false"
                role="menuitem"
              >
                Women
                <span aria-hidden="true" className="ml-2">&rsaquo;</span>
              </button>

              {/* Women Subcategories */}
              <div
                className="absolute top-0 left-full min-w-[200px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                role="menu"
                aria-label="Women submenu"
              >
                <ul className="py-2">
                  {/* T-Shirts */}
                  <li className="relative group" role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between items-center focus:outline-none focus:bg-gray-200"
                      aria-haspopup="true"
                      aria-expanded="false"
                      role="menuitem"
                    >
                      T-Shirts
                      <span aria-hidden="true" className="ml-2">&rsaquo;</span>
                    </button>

                    {/* T-Shirts Subcategories */}
                    <div
                      className="absolute top-0 left-full min-w-[180px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                      role="menu"
                      aria-label="T-Shirts submenu"
                    >
                      <ul className="py-2">
                        <li role="none">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                            role="menuitem"
                          >
                            Casual T-Shirts
                          </button>
                        </li>
                        <li role="none">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                            role="menuitem"
                          >
                            Formal T-Shirts
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* Jeans */}
                  <li className="relative group" role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between items-center focus:outline-none focus:bg-gray-200"
                      aria-haspopup="true"
                      aria-expanded="false"
                      role="menuitem"
                    >
                      Jeans
                      <span aria-hidden="true" className="ml-2">&rsaquo;</span>
                    </button>
                    <div
                      className="absolute top-0 left-full min-w-[180px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                      role="menu"
                      aria-label="Jeans submenu"
                    >
                      <ul className="py-2">
                        <li role="none">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                            role="menuitem"
                          >
                            Skinny Jeans
                          </button>
                        </li>
                        <li role="none">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                            role="menuitem"
                          >
                            Wide-Leg Jeans
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      Dresses
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Men Category */}
            <li className="relative group" role="none">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between items-center focus:outline-none focus:bg-gray-200"
                aria-haspopup="true"
                aria-expanded="false"
                role="menuitem"
              >
                Men
                <span aria-hidden="true" className="ml-2">&rsaquo;</span>
              </button>
              <div
                className="absolute top-0 left-full min-w-[200px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                role="menu"
                aria-label="Men submenu"
              >
                <ul className="py-2">
                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      Shirts
                    </button>
                  </li>
                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      Jeans
                    </button>
                  </li>
                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      Jackets
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Kids Category */}
            <li className="relative group" role="none">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between items-center focus:outline-none focus:bg-gray-200"
                aria-haspopup="true"
                aria-expanded="false"
                role="menuitem"
              >
                Kids
                <span aria-hidden="true" className="ml-2">&rsaquo;</span>
              </button>
              <div
                className="absolute top-0 left-full min-w-[200px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                role="menu"
                aria-label="Kids submenu"
              >
                <ul className="py-2">
                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      T-Shirts
                    </button>
                  </li>
                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      Shorts
                    </button>
                  </li>
                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      Sweaters
                    </button>
                  </li>
                </ul>
              </div>
            </li>

            {/* Accessories Category */}
            <li className="relative group" role="none">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex justify-between items-center focus:outline-none focus:bg-gray-200"
                aria-haspopup="true"
                aria-expanded="false"
                role="menuitem"
              >
                Accessories
                <span aria-hidden="true" className="ml-2">&rsaquo;</span>
              </button>
              <div
                className="absolute top-0 left-full min-w-[200px] bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                role="menu"
                aria-label="Accessories submenu"
              >
                <ul className="py-2">
                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      Bags
                    </button>
                  </li>
                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      Watches
                    </button>
                  </li>
                  <li role="none">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200"
                      role="menuitem"
                    >
                      Belts
                    </button>
                  </li>
                </ul>
              </div>
            </li>

          </ul>
        </div>
      </li>

      {/* Electronics */}
      <li className="relative group">
        <Link
          to="/electronics"
          className="link transition hover:text-[#FF3D3D] flex items-center gap-2 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3D3D]"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src="https://api.spicezgold.com/download/file_1734525218436_ele.png"
            alt="electronic"
            className="w-6 h-6 object-contain"
          />
          <span className="text-gray-700 group-hover:text-[#FF3D3D]">Electronics</span>
        </Link>
        <div
          className="submenu absolute top-full left-0 min-w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible z-[100] transition-all duration-300"
          role="menu"
          aria-label="Electronics submenu"
        >
          <ul className="p-2">
            {["Mobiles", "Laptops", "Cameras", "Accessories"].map((item) => (
              <li key={item} role="none">
                <Button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200 !text-gray-700"
                  role="menuitem"
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </li>

      {/* Footwear */}
      <li className="relative group">
        <Link
          to="/footwear"
          className="link transition hover:text-[#FF3D3D] flex items-center gap-2 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3D3D]"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src="https://api.spicezgold.com/download/file_1734525239704_foot.png"
            alt="footwear"
            className="w-6 h-6 object-contain"
          />
          <span className="text-gray-700 group-hover:text-[#FF3D3D]">Footwear</span>
        </Link>
        <div
          className="submenu absolute top-full left-0 min-w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible z-[100] transition-all duration-300"
          role="menu"
          aria-label="Footwear submenu"
        >
          <ul className="p-2">
            {["Men", "Women", "Kids", "Sports Shoes", "Casual Shoes"].map((item) => (
              <li key={item} role="none">
                <Button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200 !text-gray-700"
                  role="menuitem"
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </li>

      {/* Furniture */}
      <li className="relative group">
        <Link
          to="/furniture"
          className="link transition hover:text-[#FF3D3D] flex items-center gap-2 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF3D3D]"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img src={img} alt="furniture" className="w-6 h-6 object-contain" />
          <span className="text-gray-700 group-hover:text-[#FF3D3D]">Furniture</span>
        </Link>
        <div
          className="submenu absolute top-full left-0 min-w-[200px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible z-[100] transition-all duration-300"
          role="menu"
          aria-label="Furniture submenu"
        >
          <ul className="p-2">
            {["Sofas", "Beds", "Tables", "Chairs", "Cabinets"].map((item) => (
              <li key={item} role="none">
                <Button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-200 !text-gray-700"
                  role="menuitem"
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </li>

      {/* Other */}

          
    </ul>
                       

                    </div>
                </div>
            </nav>

            <CategoryPanel openCategoryPanel={openCategoryPanel} isopenCategory={isopenCategory} />
        </>
    );
}

export default Navigation;  