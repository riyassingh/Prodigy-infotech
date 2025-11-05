import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem
} from "../controllers/cartController.js";

import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all cart routes
router.use(authenticate);

// RESTful routes
router.post("/add", addToCart);        // Add item to cart
router.get("/get", getUserCart);          // Get all cart items
router.put("/updated/:id", updateCartItem);    // Update quantity of a cart item
router.delete("/delete/:id", removeCartItem); // Remove item from cart

export default router;
