import React, { useState } from "react";
import { Heart, Trash2, ShoppingCart, PlusCircle } from "lucide-react";
import { Button } from "@mui/material";
import img  from "../../assets/wishlist.png";

const initialWishlistItems = [
  {
    id: 1,
    name: "Stylish Jacket",
    brand: "Fashion Co.",
    color: "Black",
    price: 2500,
    discount: 20,
    availability: "In Stock",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Sneakers",
    brand: "Sporty",
    color: "White",
    price: 3200,
    discount: 10,
    availability: "Limited Stock",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    name: "Smart Watch",
    brand: "TechGear",
    color: "Silver",
    price: 4999,
    discount: 15,
    availability: "Out of Stock",
    image: "https://via.placeholder.com/200",
  },
];

const recommendedItems = [
  {
    id: 101,
    name: "Classic Leather Wallet",
    brand: "Elite",
    price: 899,
    discount: 5,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 102,
    name: "Noise Cancelling Headphones",
    brand: "SoundMax",
    price: 5599,
    discount: 25,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 103,
    name: "Running Shoes",
    brand: "Nike",
    price: 4299,
    discount: 15,
    image: "https://via.placeholder.com/200",
  },
];

function WishList() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState({});

  const handleRemove = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const moveToCart = (item) => {
    setCartItems([...cartItems, item]);
    setWishlistItems(wishlistItems.filter((wishlistItem) => wishlistItem.id !== item.id));
  };

  const addToWishlist = (item) => {
    setWishlistItems([...wishlistItems, item]);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">My Wishlist</h2>

      {wishlistItems.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-200"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {item.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                    {item.discount}% OFF
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold mt-4 text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm">Brand: {item.brand}</p>
              <p className="text-gray-500 text-sm">Color: {item.color}</p>

              <div className="mt-3">
                <p className="text-lg font-semibold text-gray-800">
                  ₹{(item.price * (1 - item.discount / 100)).toFixed(2)}
                  <span className="text-sm text-gray-500 line-through ml-2">₹{item.price}</span>
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`p-2 rounded-full transition-all ${
                    favorites[item.id] ? "bg-red-500 text-white" : "bg-gray-200"
                  } hover:bg-red-500 hover:text-white`}
                >
                  <Heart size={18} />
                </button>
                <button
                  onClick={() => moveToCart(item)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="text-center">
            <img
              src={img}
              alt="Empty Wishlist"
              className="w-64 mx-auto"
            />
            <p className="text-gray-600 mt-4 text-lg">Your wishlist is empty.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recommended for You</h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {recommendedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <h4 className="text-md font-semibold mt-3">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.brand}</p>
                  <p className="text-lg font-bold text-gray-800">
                    ₹{(item.price * (1 - item.discount / 100)).toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToWishlist(item)}
                    className="mt-3 px-3 py-1 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
                  >
                    <PlusCircle size={18} />
                    Add to Wishlist
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WishList;
