import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";

function HomeCatSlider() {
  const [productImages, setProductImages] = useState([]);
  const swiperRef = useRef(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/get");
        const products = res.data || [];
  
        // Extract and reverse the first images
        const firstImages = products
          .map((product) => product.images?.[0]?.url)
          .filter(Boolean)
          .reverse(); // ← This line reverses the image order
  
        setProductImages(firstImages);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="relative w-full max-w-[1400px] mx-auto p-5">
      {/* Left Navigation Button */}
     
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black text-white rounded-full shadow-lg"
      >
        <ArrowLeft size={15} />
      </button>

      {/* Swiper Slider */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={5}
        spaceBetween={20}
        freeMode={true}
      //  pagination={{ clickable: true }}
        modules={[FreeMode, Pagination, Navigation]}
        className="w-full"
      >
        {productImages.map((url, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="relative group w-[250px] h-[300px] bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:scale-105">
              <img
                src={url}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Navigation Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black text-white rounded-full shadow-lg"
      >
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default HomeCatSlider;
