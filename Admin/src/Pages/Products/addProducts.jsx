import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ProductUploader = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    productSize: [],
    productWeight: [],
    discount: 0,
    ratings: 0,
    stock: '',
    location: { value: '', label: '' },
  });

  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [message, setMessage] = useState('');
  const [productId, setProductId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/getCategory");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setProductData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (files) => {
    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...fileArray]);
    setPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleImageChange(files);
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateProduct = async () => {
    const { name, description, price, stock, category } = productData;

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    // Log raw input values for debugging
    console.log("🔍 Validating:", {
      name: trimmedName,
      description: trimmedDescription,
      category,
      price: parsedPrice,
      stock: parsedStock,
    });

    const missingFields = [];

    if (!trimmedName.length) missingFields.push("name");
    if (!trimmedDescription.length) missingFields.push("description");
    if (!category || category === "") missingFields.push("category");
    if (!price || isNaN(parsedPrice)) missingFields.push("price");
    if (!stock || isNaN(parsedStock)) missingFields.push("stock");

    if (missingFields.length > 0) {
      setMessage(`❌ Missing or invalid: ${missingFields.join(', ')}`);
      console.error("🚫 Validation failed:", missingFields);
      return;
    }

    const payload = {
      ...productData,
      name: trimmedName,
      description: trimmedDescription,
      price: parsedPrice,
      stock: parsedStock,
      discount: Number(productData.discount || 0),
      ratings: Number(productData.ratings || 0),
      images: [],
    };

    console.log("📦 Final payload:", payload);

    setMessage('⏳ Creating product...');
    try {
      const res = await fetch('http://localhost:5000/api/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.status !== 201) throw new Error(data.message || 'Failed to create product');

      setProductId(data._id);
      setMessage('✅ Product created! Uploading images...');
      uploadImages(data._id);
    } catch (err) {
      console.error("❌ Error creating product:", err);
      setMessage(`❌ ${err.message}`);
    }
  };

  const uploadImages = async (id) => {
    if (!id || imageFiles.length === 0) return;

    try {
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append('images', file);

        const res = await fetch(`http://localhost:5000/api/products/${id}/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.status !== 200) throw new Error(data.message);
      }

      setMessage('✅ All images uploaded successfully!');
    } catch (err) {
      setMessage('❌ Some images failed to upload.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload New Product</h2>

      <div className="grid gap-4">
        {['name', 'description', 'price', 'subCategory', 'stock'].map((field) => (
          <input
            key={field}
            type={(field === 'price' || field === 'stock') ? 'number' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={productData[field] || ''}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none"
          />
        ))}

        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="location.value"
            placeholder="Location Value"
            value={productData.location.value}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            name="location.label"
            placeholder="Location Label"
            value={productData.location.label}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-blue-400 p-4 rounded-lg text-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
        >
          <p className="text-gray-700">Drag & Drop images here or click to select</p>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => handleImageChange(e.target.files)}
            className="hidden"
          />
        </div>

        {previewUrls.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-2">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="relative w-24 h-24">
                <img
                  src={url}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover rounded-md shadow"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-0 right-0 bg-white p-1 rounded-full shadow hover:bg-red-100"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleCreateProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
        >
          Create Product
        </button>

        {message && (
          <motion.p
            className="text-center font-medium mt-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default ProductUploader;
