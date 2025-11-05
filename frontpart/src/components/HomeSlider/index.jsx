import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  return (
    <div className="relative z-10 mt-2 w-full mx-auto p-0">
      <Swiper
        navigation={{
          nextEl: ".custom-prev",
          prevEl: ".custom-next",
        }}
       
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="rounded-2xl shadow-md overflow-hidden cursor-pointer"
      >
        {[
          "https://cmsimages.shoppersstop.com/Women_Indian_Main_Banners_web_3466e7b36d/Women_Indian_Main_Banners_web_3466e7b36d.png",
          "https://cmsimages.shoppersstop.com/Puma_web_b46c9cedfa/Puma_web_b46c9cedfa.png",
          "https://cmsimages.shoppersstop.com/SS_25_main_kv_web_fd8e548010/SS_25_main_kv_web_fd8e548010.png",
          "https://cmsimages.shoppersstop.com/J_and_J_web_a66325f963/J_and_J_web_a66325f963.png",
          "https://cmsimages.shoppersstop.com/WW_Main_Banners_web_98669c5889/WW_Main_Banners_web_98669c5889.png",
          "https://cmsimages.shoppersstop.com/Watches_web_914c0225e1/Watches_web_914c0225e1.png"
        ].map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img 
              src={src} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-95 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons with Tailwind styling */}
      <div className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white  rounded-full shadow-md cursor-pointer hover:bg-gray-300">
        <ChevronLeft className="text-black w-4 h-4" />
      </div>
      <div className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white  rounded-full shadow-md cursor-pointer hover:bg-gray-300">
        <ChevronRight className="text-black w-4 h-4" />
      </div>
    </div>
  );
}
