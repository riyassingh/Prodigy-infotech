// components/ProductSlider.jsx
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItem from "../ProductItem";
import { ArrowLeft, ArrowRight } from "lucide-react";

function ProductSlider({ items = 4, products = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!Array.isArray(products) || products.length === 0) {
    return null; // Or you can render a fallback UI like: <p>No related products.</p>
  }

  return (
    <div className="relative w-full p-4">
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-200"
      >
        <ArrowLeft size={24} />
      </button>
      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-200"
      >
        <ArrowRight size={24} />
      </button>

      

      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: items || 4 },
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSlider;
