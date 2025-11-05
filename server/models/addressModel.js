import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    addressLine: {
        type: String,
        required: true,
        default: ""
    },
    city: {
        type: String,
        required: true,
        default: ""
    },
    state: {
        type: String,
        required: true,
        default: ""
    },
    country: {
        type: String,
        required: true,
        default: ""
    },
    pincode: {
        type: String,
        required: true,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       
    }
}, { timestamps: true });

const AddressSchema = mongoose.model("Address", addressSchema);
export default AddressSchema;
