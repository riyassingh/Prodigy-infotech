import React, { useState, useEffect } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/CatSlider";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment, MdOutlineVerified } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductSlider from "../../components/ProductSlider";
import NewArrival from "../../components/NewArrival/NewArrival";

import HomeSlider2 from "../../components/HomeSlider2/HomeSlider2";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const categoryLabels = [
  "Home & Furniture",
  "Beauty",
  "Electronics",
  "Fashion",
  "Footwear",
  "Mobile",
];

const categoryMap = {
  // Replace the IDs below with your real MongoDB ObjectIds for each category
  "Home & Furniture": "6803c59d5f1718befe3e80b1",
  "Beauty":          "6803c5e95f1718befe3e80db",
  "Electronics":     "67fe8b7403b366736749edfd",
  "Fashion":         "67fe8d2203b366736749ee1e",
  "Footwear":        "67fe9aa4652d107eab9840b6",
  "Mobile":          "6803c6535f1718befe3e8100",
};
function Home() {
  const Navigate = useNavigate();
  const calculateTimeLeft = () => {
    const offerEndTime = new Date().setHours(new Date().getHours() + 5, 0, 0); // Offer ends in 5 hours
    const now = new Date().getTime();
    const difference = offerEndTime - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

{/**Use ScrollBar */}


const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchProductsByCategory = async (categoryKey) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/category/${categoryKey}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProductsByCategory(categoryMap[categoryLabels[value]]);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
return (
  <>
      <HomeSlider />
  {/* Offer Countdown Section */}
      <section className="py-2 bg-white flex justify-center items-center">
        <div className="container text-center p-4 bg-white shadow-lg rounded-lg border text-[#FF3D3D]">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Limited Time Offer! 🔥</h2>
          <p className="text-gray-600 text-lg">Hurry up! Offer ends in:</p>
          <div className="flex justify-center items-center gap-4 text-2xl font-semibold mt-4 text-[#FF3D3D]">
            <div className="flex flex-col items-center">
              <span className="text-4xl">{timeLeft.hours}</span>
              <span className="text-sm text-gray-500">Hours</span>
            </div>
            <span className="text-4xl">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl">{timeLeft.minutes}</span>
              <span className="text-sm text-gray-500">Minutes</span>
            </div>
            <span className="text-4xl">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl">{timeLeft.seconds}</span>
              <span className="text-sm text-gray-500">Seconds</span>
            </div>
          </div>
          <button className="mt-6 text-[#FF3D3D]  px-6 py-2 rounded-lg font-semibold hover:text-red-400 transition">
            Shop Now
          </button>
        </div>
      </section>

      <section className="p-2 pb-12 bg-white flex flex-col md:flex-row items-center gap-4">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-3 p-4 md:h-[500px]">
        {/* Left part with slider covering 3/4 in medium+ screens */}
        <div className="md:col-span-3 flex justify-center items-center p-4 w-full h-full">
          <HomeSlider2 />
        </div>
        {/* Right part with images in 2x2 grid covering 1/4 */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full h-full md:h-[500px]">
          <img src="https://cmsimages.shoppersstop.com/Deals_Card_Web_LATIN_QUARTER_4726b82b55/Deals_Card_Web_LATIN_QUARTER_4726b82b55.png" />
          <img src="https://cmsimages.shoppersstop.com/Deals_Card_Web_Juniper_25236c986f/Deals_Card_Web_Juniper_25236c986f.png" className="w-[300px] h-full object-cover rounded-lg shadow-lg" />
          <img src="https://cmsimages.shoppersstop.com/Deals_Card_Web_VAN_HEUSEN_7ba04a3e5c/Deals_Card_Web_VAN_HEUSEN_7ba04a3e5c.png" className="w-[300px] h-full object-cover rounded-lg shadow-lg" />
          <img src="https://cmsimages.shoppersstop.com/Deals_Card_Web_ALLEN_SOLLY_8bbba4c471/Deals_Card_Web_ALLEN_SOLLY_8bbba4c471.png" className="w-[300px] h-full object-cover rounded-lg shadow-lg" />
        </div>
      </div>
    </section>

      <section className="py-5 bg-white flex justify-center items-center">
        <div className="container flex flex-wrap md:flex-nowrap justify-between items-center px-10 gap-5">
          <div className="flex items-center gap-3 w-full md:w-1/3 p-4 border border-red-500 rounded-lg shadow-md bg-white">
            <FaShippingFast className="text-3xl text-red-500" />
            <div>
              <h3 className="text-lg font-semibold">Free Shipping</h3>
              <p className="text-sm text-gray-600">For Plus Members on all orders</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-1/3 p-4 border border-green-500 rounded-lg shadow-md bg-white">
            <MdOutlineVerified className="text-3xl text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">100% Genuine Products</h3>
              <p className="text-sm text-gray-600">Quality assured by top brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-1/3 p-4 border border-blue-500 rounded-lg shadow-md bg-white">
            <MdOutlinePayment className="text-3xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Secure Payments</h3>
              <p className="text-sm text-gray-600">Multiple safe payment options</p>
            </div>
          </div>
        </div>
      </section>


      <HomeCatSlider />

      <section className="py-12 bg-whiteN gap-4 ">
      <div className="container mx-auto px-6 bg-white py-10  ">
        <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-2xl p-8 w-[1400px]">
          {/* Left Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-800">Popular Products</h3>
            <p className="text-gray-500">Don't miss the chance to grab the latest deals.</p>
          </div>

          {/* Right Section - Tab Menu */}
          <div className="w-[1200px] px-4">
     <div className="w-[1200px] px-4">
  <div className="flex items-center justify-between">
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper", flexGrow: 1 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#FF3D3D",
          },
        }}
      >
        {categoryLabels.map((label, index) => (
          <Tab
            key={index}
            label={label}
            sx={{
              color: value === index ? "#FF3D3D" : "#4B5563",
              fontWeight: value === index ? "bold" : "normal",
            }}
          />
        ))}
      </Tabs>
    </Box>
    <button className="ml-4 px-4 py-2 text-white bg-red-500 rounded-[8px] hover:bg-red-600 transition" onClick={()=>Navigate("ProductListing")}>
      View All
    </button>
  </div>
</div>

      <ProductSlider products={products} items={5} />
    </div>
        </div>
      </div>
       
    </section>


    <section className="bg-white flex items-center justify-center">
  <NewArrival />
</section>


      
    </>
  );
}

export default Home;
