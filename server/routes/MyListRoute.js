import express from "express";
import {
    addToMylist,
    getMylistByUser,
    removeFromMylist,
    isProductInMylist,
    countMylistItems,
  } from "../controllers/ListController.js";
  

import authenticate from "../middleware/auth.middleware.js"; // ✅ Match the function name here

const router = express.Router();

// Add item to wishlist
router.post("/add", authenticate, addToMylist);

// Get all wishlist items for the logged-in user
router.get("/get", authenticate, getMylistByUser);

// Remove item from wishlist by item ID
router.delete("/delete/:id", authenticate, removeFromMylist);

// Check if a product is in the wishlist (by productId in query string)
router.get("/check", authenticate, isProductInMylist);

// Get count of wishlist items
router.get("/count", authenticate, countMylistItems);

export default router;
