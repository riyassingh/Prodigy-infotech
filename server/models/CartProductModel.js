import mongoose from "mongoose";

const cartProdcut = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
    ,
    quantity:{
        type:Number,
        default:1
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const CartProductSchema= mongoose.model("CartProduct",cartProdcut);
export default CartProductSchema;