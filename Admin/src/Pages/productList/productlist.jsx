import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const navigate = useNavigate();

  // Check admin login on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories/getCategory");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const fetchProducts = async (categoryId = "") => {
    try {
      setLoading(true);
      const url = categoryId
        ? `http://localhost:5000/api/products/category/${categoryId}`
        : "http://localhost:5000/api/products/get";

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch products");
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/delete/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete product");

      toast.success(" Product deleted successfully!");
      fetchProducts(selectedCat);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("❌ Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleSave = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/update/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product");

      toast.success(" Product updated successfully!");
      setEditingProductId(null);
      fetchProducts(selectedCat);
    } catch (err) {
      toast.error("Error updating product: " + err.message);
    }
  };

  const handleCancel = () => {
    setEditingProductId(null);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCat) {
      fetchProducts(selectedCat);
    } else {
      fetchProducts();
    }
  }, [selectedCat]);

  return (
    <div className="p-4 ml-[60px]">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Product List</h1>

      {/* Filter by category */}
      <div className="mb-6">
        <label className="font-medium mr-2">Filter by Category:</label>
        <select
          className="border p-2 rounded"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading or error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow hover:shadow-md transition relative"
          >
            <img
              src={product.images[0]?.url || "https://via.placeholder.com/200"}
              alt={product.name}
              className="w-full h-48 object-cover mb-3 rounded"
            />

            {editingProductId === product._id ? (
              <>
                <input
                  className="border p-1 mb-2 w-full"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Product Name"
                />
                <textarea
                  className="border p-1 mb-2 w-full"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  placeholder="Description"
                />
                <input
                  type="number"
                  className="border p-1 mb-2 w-full"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  placeholder="Price"
                />
                <input
                  type="number"
                  className="border p-1 mb-2 w-full"
                  value={editForm.stock}
                  onChange={(e) =>
                    setEditForm({ ...editForm, stock: e.target.value })
                  }
                  placeholder="Stock"
                />

                <div className="flex justify-between">
                  <button
                    onClick={() => handleSave(product._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600 mb-2">
                  {product.description.slice(0, 60)}...
                </p>
                <p className="text-green-600 font-bold">₹{product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
