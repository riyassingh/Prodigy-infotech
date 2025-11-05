import React, { useEffect, useState } from "react";

const AdminCategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", image: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  const API = "http://localhost:5000/api/categories"; // Change to your backend

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch(`${API}/getCategory`);
    const data = await res.json();
    setCategories(data);
  };

  const fetchProducts = async (categoryId) => {
    const res = await fetch(`${API}/products?categoryId=${categoryId}`);
    const data = await res.json();
    setProducts(data.products || []);
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setForm({ name: category.name, image: category.image });
  };

  const handleUpdate = async () => {
    const res = await fetch(`${API}/updateCategory/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setEditingId(null);
      fetchCategories();
    }
  };
  

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
  
    const res = await fetch(`${API}/deleteCategory/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchCategories();
    }
  };
  

  const handleImageUpload = async (categoryId) => {
    const formData = new FormData();
    formData.append("image", selectedFile); // this should match multer field name
  
    const res = await fetch(`${API}/uploadImage/${categoryId}`, {
      method: "POST",
      body: formData,
    });
  
    if (res.ok) {
      setSelectedFile(null);
      fetchCategories();
    }
  };
  

  return (
    <div className="p-6 max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Category Manager</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {categories.map((cat) => (
      <div
        key={cat._id}
        className="border p-5 rounded-2xl shadow-lg bg-white transition-transform hover:scale-[1.02]"
      >
        {editingId === cat._id ? (
          <>
            <input
              type="text"
              className="border w-full p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Category Name"
            />
            <input
              type="text"
              className="border w-full p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{cat.name}</h3>
            <div className="flex flex-wrap gap-3 mt-3">
              <button
                onClick={() => fetchProducts(cat._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition"
              >
                View Products
              </button>
              <button
                onClick={() => handleEdit(cat)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
              >
                Delete
              </button>
            </div>
            <div className="mt-4">
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="mb-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <button
                onClick={() => handleImageUpload(cat._id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
              >
                Upload Image
              </button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>

  {products.length > 0 && (
    <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-inner">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Products under selected category:</h3>
      <ul className="list-disc ml-6 space-y-2 text-gray-600">
        {products.map((p) => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
};

export default AdminCategoryManager;
