import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

function UploadBox({ productId }) {
  const [images, setImages] = useState([]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${productId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedUrl = res.data.product.images.slice(-1)[0];
      setImages((prev) => [...prev, uploadedUrl]);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image");
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    // Optionally: call backend to remove image from product
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="cursor-pointer w-80">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-600">
          Click to upload an image
        </div>
      </label>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-40 h-40 rounded-lg overflow-hidden shadow">
            <img
              src={image}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
            <button
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
              onClick={() => handleRemoveImage(index)}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadBox;
