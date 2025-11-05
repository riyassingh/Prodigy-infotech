import express from "express";
import {
  createCategory,
  uploadImage,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import upload from "../middleware/multer.js"; // Multer middleware for image upload

const router = express.Router();

// Create a new category
router.post("/createCategory", createCategory);

// Upload image to a category
router.post("/uploadImage/:id", upload.single("image"), uploadImage);

// Get all categories
router.get("/getCategory", getCategories);

// Get single category by ID
router.get("/getCategory/:id", getCategoryById);

// Update a category
router.put("/updateCategory/:id", updateCategory);

// Delete a category
router.delete("/deleteCategory/:id", deleteCategory);

export default router;
