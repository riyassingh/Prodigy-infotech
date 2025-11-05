import mongoose from "mongoose";

const mylistSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        default: "",
    },
    images: {
        type: String,
        default: "",
    },
    rating: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    isInStock: {
        type: Boolean,
        default: true,
    },
    brand: {
        type: String,
        default: "Generic"
    },
    newPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Mylist = mongoose.model("Mylist", mylistSchema);
export default Mylist;
