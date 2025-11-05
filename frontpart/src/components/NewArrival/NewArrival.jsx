import React from "react";
import { motion } from "framer-motion";
import image1 from "../../assets/playstation.png";
import image2 from "../../assets/womenCollections.png";
import image3 from "../../assets/perfume.png";
import image4 from "../../assets/speakers.png";

const hoverEffect = {
  scale: 1.05,
  transition: { duration: 0.4, ease: "easeInOut" },
};

const NewArrival = () => {
  return (
    <div className="flex flex-col my-24 mx-auto px-4 max-w-[1200px]">
      <div className="mb-14 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">✨ New Arrivals</h2>
        <p className="text-gray-500 mt-2">Discover the latest additions to our collection</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Featured Product */}
        <motion.div
          className="bg-black rounded-lg overflow-hidden md:h-[600px] md:w-[570px] relative group"
          whileHover={hoverEffect}
        >
          <img
            src={image1}
            alt="PlayStation"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-300"
          />
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h2 className="text-2xl md:text-3xl font-semibold">PlayStation 5</h2>
            <p className="text-sm mt-1 mb-3 text-gray-200">Experience next-gen gaming like never before.</p>
            <button className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200">
              Shop Now
            </button>
          </div>
        </motion.div>

        {/* Right Smaller Products */}
        <div className="flex flex-col gap-8 w-full">
          {/* Top Right Product */}
          <motion.div
            className="bg-black rounded-lg overflow-hidden h-[284px] relative group"
            whileHover={hoverEffect}
          >
            <img
              src={image2}
              alt="Women's Collection"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-300"
            />
            <div className="absolute bottom-6 left-6 text-white z-10">
              <h3 className="text-xl md:text-2xl font-semibold">Women’s Collection</h3>
              <p className="text-sm text-gray-200">Elegance redefined with our latest styles.</p>
              <button className="mt-3 px-3 py-1.5 bg-white text-black font-medium rounded hover:bg-gray-200">
                Explore
              </button>
            </div>
          </motion.div>

          {/* Bottom Right - 2 Products */}
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Perfume */}
            <motion.div
              className="bg-black rounded-lg overflow-hidden h-[284px] sm:w-1/2 relative group"
              whileHover={hoverEffect}
            >
              <img
                src={image3}
                alt="Luxury Perfume"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-300"
              />
              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-lg md:text-xl font-semibold">Luxury Perfume</h3>
                <p className="text-sm text-gray-200">A scent that tells your story.</p>
                <button className="mt-2 px-3 py-1.5 bg-white text-black font-medium rounded hover:bg-gray-200">
                  View More
                </button>
              </div>
            </motion.div>

            {/* Speaker */}
            <motion.div
              className="bg-black rounded-lg overflow-hidden h-[284px] sm:w-1/2 relative group"
              whileHover={hoverEffect}
            >
              <img
                src={image4}
                alt="Portable Speaker"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-300"
              />
              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-lg md:text-xl font-semibold">Portable Speaker</h3>
                <p className="text-sm text-gray-200">Bold sound. Anywhere. Anytime.</p>
                <button className="mt-2 px-3 py-1.5 bg-white text-black font-medium rounded hover:bg-gray-200">
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
