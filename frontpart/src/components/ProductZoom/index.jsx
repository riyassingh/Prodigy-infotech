import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination, FreeMode } from "swiper/modules";

function ProductZoom({ images = [] }) {
  const swiperRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images available.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4 md:p-6">
      {/* Zoomable Product Image */}
      <div className="w-full max-w-[450px] flex justify-center">
        <InnerImageZoom
          zoomType="hover"
          zoomScale={2}
          src={selectedImage}
          className="rounded-lg shadow-lg border border-gray-300"
        />
      </div>

      {/* Swiper Thumbnails */}
      <div className="w-full max-w-[450px]">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className={`p-2 border rounded-lg shadow-md cursor-pointer transition-all ${
                  selectedImage === img ? "border-blue-500 scale-105" : "border-gray-300 hover:scale-105"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="rounded-md w-full h-20 object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProductZoom;
