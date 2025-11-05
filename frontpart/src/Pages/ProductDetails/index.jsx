import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductZoom from "../../components/ProductZoom";
import {
  FaStar,
  FaRegStar,
  FaRegHeart,
  FaHeart,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import QtyBox from "./QtyBox";

function ProductDetail() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const reviews = [
    { name: "Rahul S.", rating: 4, text: "Great value for money!" },
    { name: "Priya M.", rating: 5, text: "Best budget phone!" },
    { name: "Amit K.", rating: 3, text: "Okay phone for the price." },
    { name: "Neha D.", rating: 4, text: "Good design, solid battery backup." },
  ];

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);

        // Fetch the main product
        const res = await axios.get(
          `http://localhost:5000/api/products/get/${productId}?t=${Date.now()}`
        );
        const productData = res.data;
        setProduct(productData);

        // Fetch related products based on category (if available)
        const categoryId =
          typeof productData.category === "object"
            ? productData.category._id
            : productData.category;

        if (categoryId) {
          const relatedRes = await axios.get(
            `http://localhost:5000/api/products/category/${categoryId}`
          );
          const related = relatedRes.data.filter((p) => p._id !== productId);
          setRelatedProducts(related);
        } else {
          setRelatedProducts([]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
            product_id: productId,
            quantity,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is in localStorage
            },
            withCredentials: true, // If you’re also using cookies for the token
        }
    );
      
      alert("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
      alert("Failed to add to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-lg">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-lg">
        <p>Product not found!</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-8 px-4 lg:px-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-start gap-6">
        {/* Image Zoom Section */}
        <div className="w-full lg:w-[40%] flex justify-center">
          <ProductZoom images={product.images?.map((img) => img.url) || []} />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium text-lg">
              Brand:{" "}
              <span className="bg-gray-100 px-3 py-1 rounded-md">
                {product.brand}
              </span>
            </span>
            <div className="flex items-center text-yellow-500 text-lg">
              {[...Array(4)].map((_, i) => <FaStar key={i} />)} <FaRegStar />
              <span className="text-gray-700 text-sm ml-1">(120 Reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <span className="line-through text-gray-500">
              ₹{product.originalPrice || 9999}
            </span>
            <span className="text-red-600 font-semibold text-2xl">
              ₹{product.discountedPrice || product.price}
            </span>
            <span className="text-green-600 font-medium text-lg">
              You save 25%!
            </span>
          </div>

          <span className="text-green-600 font-semibold text-lg">
            In Stock
          </span>

          <QtyBox quantity={quantity} setQuantity={setQuantity} />

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={addingToCart}
          >
            {addingToCart ? "Adding..." : "Add to Cart"}
          </button>

          <div className="flex items-center gap-3 mt-4">
            <button onClick={() => setWishlist(!wishlist)} className="text-[#FF3D3D] text-2xl">
              {wishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
            <a
              href="#"
              className="text-[#FF3D3D] hover:underline"
              onClick={(e) => {
                e.preventDefault();
                setWishlist(!wishlist);
              }}
            >
              {wishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </a>
          </div>

          <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg flex flex-col gap-2">
            <div className="flex items-center text-gray-700">
              <FaTruck className="text-green-600 text-xl mr-2" />
              <span>
                Estimated Delivery: <strong>3–5 business days</strong>
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaShieldAlt className="text-blue-600 text-xl mr-2" />
              <span>1 Year Manufacturer Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="container pt-10">
        <div className="flex items-center gap-6 border-b-2 border-gray-200 pb-3">
          {["Description", "Product Details", "Reviews"].map((item) => (
            <span
              key={item}
              className={`cursor-pointer text-lg font-medium transition duration-200 ${
                activeTab === item
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
          {activeTab === "Description" && (
            <p className="text-gray-700">
              {product.description || "No description available."}
            </p>
          )}
          {activeTab === "Product Details" && (
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>Category:</strong>{" "}
                {product.category?.name || product.category || "N/A"}
              </li>
              <li>
                <strong>Brand:</strong> {product.brand}
              </li>
              <li>
                <strong>Stock:</strong> {product.stock}
              </li>
            </ul>
          )}
          {activeTab === "Reviews" && (
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div className="border-b pb-3" key={i}>
                  <p className="text-gray-700">
                    <strong>
                      {"⭐️".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                    </strong>{" "}
                    - {r.text}
                  </p>
                  <p className="text-sm text-gray-500">— {r.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="container mt-6">
        <h2 className="text-[20px] font-[600] mb-2">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300"
              >
                <a href={`/product/${item._id}`}>
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                </a>
                <div className="p-4">
                  <a href={`/product/${item._id}`}>
                    <h3 className="text-md font-semibold text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>
                  </a>
                  <div className="text-red-600 font-semibold mt-1 text-lg">
                    ₹{item.discountedPrice || item.price}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={async () => {
                        try {
                          await axios.post(
                            "http://localhost:5000/api/cart/add",
                            {
                              product_id: item._id,
                              quantity: 1,
                            },
                            { withCredentials: true }
                          );
                          alert("Product added to cart!");
                        } catch (err) {
                          alert("Failed to add to cart.");
                          console.error(err);
                        }
                      }}
                      className="bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                    <button className="text-[#FF3D3D] text-xl">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
