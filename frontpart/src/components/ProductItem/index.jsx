import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product, show = "name" }) {
  const imageUrl = product.images?.[0]?.url || "https://via.placeholder.com/150";
  const WORD_LIMIT = 5;

  // Truncate the name to the first 5 words
  const words = product.name.split(/\s+/);
  const truncatedName = words.slice(0, WORD_LIMIT).join(" ");
  const displayName =
    words.length > WORD_LIMIT ? `${truncatedName}…` : truncatedName;

  return (
    <div className="w-[1000px] sm:w-30 md:w-40 lg:w-56 bg-white shadow-xl rounded-lg p-4 hover:shadow-xl transition-all duration-300">
      <div className="relative group">
        <Link to={`/product/${product._id}`}>
          <div className="relative w-full h-40 md:h-44">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
        </Link>
      </div>

      <div className="p-3 text-center">
        {/* Display truncated name (5 words) */}
        <h3 className="text-sm md:text-base font-semibold text-gray-800">
          {displayName}
        </h3>

        {/* Optionally show full description if needed */}
        {show === "description" && product.description && (
          <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mt-1">
            {product.description}
          </p>
        )}

        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-base md:text-lg font-bold text-green-600">
            ₹{product.price}
          </span>
        </div>

        <button className="w-full mt-3 bg-[#FF3D3D] hover:bg-[#f27474] text-white text-sm md:text-base py-2 rounded-lg transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
