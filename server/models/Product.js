import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        subCategory: {
            type: String,
        },
        productSize: [{
            type: String,
        }],
        productWeight: [{
            type: String,
        }],
        discount: {
            type: Number,
            default: 0,
        },
        ratings: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        images: [
            {
                url: String,
                public_id: String
            }
        ],
        location: {
            value: { type: String },
            label: { type: String }
        },
        brand: {
            type: String,
            default: "Generic"
        },
        dateCreated: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

productSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
