import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EffectFade, Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import img from '../../assets/phone.png';
import img1 from '../../assets/laptop.jpg';

const slides = [
  { src: img, text: 'Latest Smartphone - Experience Innovation' },
  { src: img1, text: 'High Performance Laptop - Work & Play' },
  { src: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS9Ad_kWjfLK8Uf-_IhJdHjjcJX9xeB-hOdZClITfBdPBGCRpx8NisyMR2taleJteMdEVFG9iY1ohV-3cuHr742eXqNixqBnk99LKursrx19zMtreXdkj2PbA', text: 'Fashionable Handbag - Elevate Your Style' },
  { src: 'https://images.meesho.com/images/products/441711758/83xgy_1200.jpg', text: 'Trendy Footwear - Step in Style' }
];

function HomeSlider2() {
  return (
    <div className="relative w-full md:w-[87%] h-[420px] md:h-[500px] py-2">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Autoplay]}
        className="rounded-lg shadow-lg w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative flex justify-center items-center">
            <img 
              src={slide.src} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2  text-white text-lg md:text-2xl font-semibold px-4 py-2 rounded-lg "
            >
              {slide.text}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Buttons */}
      <div className="custom-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white/80 hover:bg-white text-black shadow-lg rounded-full w-10 h-10 md:w-12 md:h-12 cursor-pointer transition-all">
        <ChevronLeft className="w-6 h-6" />
      </div>
      <div className="custom-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white/80 hover:bg-white text-black shadow-lg rounded-full w-10 h-10 md:w-12 md:h-12 cursor-pointer transition-all">
        <ChevronRight className="w-6 h-6" />
      </div>
    </div>
  );
}

export default HomeSlider2;