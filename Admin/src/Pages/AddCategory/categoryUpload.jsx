import React, { useRef, useState } from "react";
import { X, UploadCloud, Loader } from "lucide-react";

function Upload({ categoryId, onImageUpload }) {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview({ file, url });

    await uploadImage(file);
  };

  const uploadImage = async (file) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${BASE_URL}/api/categories/uploadImage/${categoryId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Upload failed");

      onImageUpload({
        url: data.image.url,
        public_id: data.image.public_id,
      });

      setPreview({ file, url: data.image.url });
      alert("✅ Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
  };

  return (
    <div className="p-6 border rounded-2xl shadow-lg bg-white">
      <div
        className="border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 transition rounded-xl p-8 text-center cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        <UploadCloud className="mx-auto text-blue-500" size={40} />
        <p className="mt-2 text-gray-700 font-medium">Click or drag & drop to upload</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {isUploading && (
        <div className="mt-4 text-center text-gray-700">
          <Loader className="mx-auto animate-spin" size={24} />
          <p>Uploading image...</p>
        </div>
      )}

      {preview && !isUploading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="relative w-full h-28 rounded-xl overflow-hidden shadow-sm">
            <img
              src={preview.url}
              alt="Uploaded Preview"
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
