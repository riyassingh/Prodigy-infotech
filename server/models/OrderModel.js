import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: [true, "Provide orderId"],
      unique: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        product_details: {
          name: String,
          description: String,
          price: Number,
          quantity: {
            type: Number,
            default: 1,
          },
          images: [
            {
              type: String, // Stores image URLs
            },
          ],
        },
      },
    ],
    subtotal_Price: {
      type: Number,
      default: 0,
    },
    total_Price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    payment_id: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address", // Make sure you have a model named 'Address'
      required: true,
    },
    invoice_receipt: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const OrderSchema = mongoose.model("Order", orderSchema);
export default OrderSchema;
