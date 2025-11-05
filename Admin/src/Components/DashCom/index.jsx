import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import img1 from '../../assets/bars.png';
import pie from '../../assets/pie-chart.png';
import rev from '../../assets/revenue.png';

function DashCom() {
  const stats = [
    {
      title: 'New Order',
      count: '1543',
      gif: 'https://cdn-icons-gif.flaticon.com/15576/15576191.gif',
      icon: img1,
    },
    {
      title: 'Sales',
      count: '1543',
      gif: 'https://cdn-icons-gif.flaticon.com/15576/15576162.gif',
      icon: pie,
    },
    {
      title: 'Revenue',
      count: '1543',
      gif: 'https://cdn-icons-gif.flaticon.com/17904/17904628.gif',
      icon: rev,
    },
    {
      title: 'Total Products',
      count: '1543',
      gif: 'https://cdn-icons-gif.flaticon.com/17907/17907867.gif',
      icon: img1,
    },
  ];

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      modules={[Navigation]}
      className="mySwiper pl-64 mt-8"
    >
      {stats.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="box p-4 rounded-lg border border-gray-300 shadow-sm flex justify-between items-center h-full bg-white">
            <div className="flex items-center gap-4 w-full">
              <img src={item.gif} alt={item.title} className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <h3 className="font-medium text-gray-700 text-sm">{item.title}</h3>
                <b className="text-lg text-gray-900">{item.count}</b>
              </div>
            </div>
            <img src={item.icon} alt="icon" className="w-10 h-10 object-contain ml-auto" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default DashCom;
