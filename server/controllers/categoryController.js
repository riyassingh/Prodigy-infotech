import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import CategoryModel from "../models/categoryModel.js"; // single source of truth

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, image, images } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const newCategory = new CategoryModel({
      name,
      image: image || "",
      images: images || [],
    });

    await newCategory.save();
    res.status(201).json({ message: "Category created", category: newCategory });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { image, images } = req.body;

    const updateFields = {};

    if (image) updateFields.image = image;
    if (images) updateFields.images = images;

    // Auto-fill image from images[0] if image not directly provided
    if (!image && images?.[0]?.url) {
      updateFields.image = images[0].url;
    }

    const updated = await CategoryModel.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updated) return res.status(404).json({ message: "Category not found" });

    res.json(updated);
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    for (const img of category.images) {
      if (img?.public_id) await cloudinary.uploader.destroy(img.public_id);
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ error: err.message });
  }
};

// Upload image for a category
export const uploadImage = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const category = await CategoryModel.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Delete previous images
    for (const img of category.images) {
      if (img?.public_id) await cloudinary.uploader.destroy(img.public_id);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "categories",
    });

    const newImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    category.images = [newImage];
    category.image = newImage.url;
    await category.save();

    res.status(200).json({
      message: "Image uploaded",
      image: newImage,
      category,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};
