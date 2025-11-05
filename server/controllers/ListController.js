import Mylist from "../models/MylistModel.js";
import Product from "../models/Product.js";

// Add to wishlist
export const addToMylist = async (req, res) => {
    try {
        const { productId } = req.body;

        const exists = await Mylist.findOne({ userId: req.user.id, productId });
        if (exists) return res.status(400).json({ message: "Product already in wishlist" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const newItem = await Mylist.create({
            userId: req.user.id,
            productId: product._id,
            productTitle: product.name || "",
            images: product.images?.[0] || "",
            rating: product.ratings || 0,
            price: product.price || 0,
            newPrice: product.price || 0,
            discount: product.discount || 0,
            isInStock: product.stock > 0,
            brand: product.brand || "Generic"
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all wishlist items for logged in user
export const getMylistByUser = async (req, res) => {
    try {
        const items = await Mylist.find({ userId: req.user.id }).populate("productId");
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from wishlist
export const removeFromMylist = async (req, res) => {
    try {
        const item = await Mylist.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.status(200).json({ message: "Item removed from wishlist" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check if product is already in wishlist
export const isProductInMylist = async (req, res) => {
    try {
        const { productId } = req.query;
        const exists = await Mylist.findOne({ productId, userId: req.user.id });
        res.status(200).json({ exists: !!exists });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Count items in wishlist
export const countMylistItems = async (req, res) => {
    try {
        const count = await Mylist.countDocuments({ userId: req.user.id });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
