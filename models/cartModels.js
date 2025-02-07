import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Users",
    //     required: true
    // },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
