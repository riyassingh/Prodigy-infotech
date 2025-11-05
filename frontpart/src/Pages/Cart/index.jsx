import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, amount) => {
    const item = cartItems.find((item) => item._id === id);
    const newQty = item.quantity + amount;
    if (newQty < 1) return handleRemoveClick(item);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/update/${id}`,
        { quantity: newQty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems((prev) =>
        prev.map((it) => (it._id === id ? res.data.updatedItem : it))
      );
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
    }
  };

  const handleRemoveClick = (item) => {
    setItemToRemove(item);
    setShowPopup(true);
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/delete/${itemToRemove._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems((prev) =>
        prev.filter((item) => item._id !== itemToRemove._id)
      );
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error.message);
    } finally {
      setShowPopup(false);
      setItemToRemove(null);
    }
  };

  const getEffectivePrice = (product) =>
    product.price - product.price * (product.discount / 100);

  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + item.product_id.price * item.quantity,
    0
  );

  const totalDiscount = cartItems.reduce(
    (acc, item) =>
      acc + (item.product_id.price - getEffectivePrice(item.product_id)) * item.quantity,
    0
  );

  const totalAmount = totalOriginalPrice - totalDiscount;
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) return <div className="text-center mt-10">Loading cart...</div>;

  return (
    <section className="py-5 bg-gray-100">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-6">
        {/* Cart Items Section */}
        <div className="w-full md:w-[70%] bg-white shadow-md rounded-md p-5">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <p className="mt-1 text-gray-600">
            Total Items:{" "}
            <span className="font-bold text-red-500">{cartItems.length}</span>
            {" | "}
            Total Quantity: <span className="font-bold text-red-500">{totalQuantity}</span>
          </p>
          <div className="mt-5 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const product = item.product_id;
                const price = getEffectivePrice(product);

                return (
                  <div key={item._id} className="flex items-center gap-4 p-4 border rounded-md">
                    <div className="w-24 h-24 overflow-hidden rounded-md">
                      <Link to={`/product/${product._id}`} className="group">
                        <img
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        <Link to={`/product/${product._id}`} className="text-gray-800 hover:underline">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{product.brand}</p>
                      <div className="mt-2 text-lg">
                        <span className="line-through text-gray-500 text-sm">₹{product.price}</span>
                        <span className="text-red-600 font-bold text-xl ml-2">₹{price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <button onClick={() => updateQuantity(item._id, -1)} className="px-3 py-1 bg-gray-300 rounded-l-md">-</button>
                        <span className="px-4 py-1 bg-white border">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} className="px-3 py-1 bg-gray-300 rounded-r-md">+</button>
                      </div>
                    <button
  onClick={() => handleRemoveClick(item)}
  className="mt-2 px-4 py-2 rounded-md bg-red-500 text-white font-medium shadow-sm hover:bg-red-600 transition duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
>
  Remove
</button>

                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600 mt-4">Your cart is empty.</p>
            )}
          </div>
        </div>

        {/* Price Details */}
        <div className="w-full md:w-[30%] bg-white shadow-md rounded-md p-5">
          <h3 className="text-xl font-semibold mb-4">Price Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Original Price</span>
              <span>₹{totalOriginalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span className="font-medium">Discount</span>
              <span>-₹{totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Delivery Charges</span>
              <span className="text-green-500">Free</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-3 flex justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <p className="text-green-500 mt-1 text-sm">You will save ₹{totalDiscount.toFixed(2)} on this order</p>
          <Link to="/checkout">
            <button className="w-full mt-4 bg-red-500 text-white py-2 rounded-md text-lg hover:bg-red-600">
              Checkout
            </button>
          </Link>
        </div>
      </div>

      {/* Remove confirmation popup */}
  {showPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-[90%] max-w-md text-center animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this item? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmRemove}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold shadow-md hover:from-red-600 hover:to-red-800 transform hover:scale-105 transition duration-300"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2.5 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transform hover:scale-105 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default Cart;
