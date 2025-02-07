import mongoose from "mongoose";
import Cart from "../models/cartModels.js";
import productModel from "../models/productModels.js";

const addToCart = async (userId, productId, quantity) => {
    try {
        // if (typeof productId !== "string") {
        //     throw new Error(`Invalid product ID format. Expected a string, got ${typeof productId}`);
        // }
        // if (!mongoose.isValidObjectId(productId)) {
        //     throw new Error(`Invalid ObjectId: ${productId}`);
        // }

        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        if (product.stock < quantity) {
            throw new Error("Not enough stock available");
        }

       let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId});
        }

     
        // const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        // if (itemIndex > -1) {
        //     cart.items[itemIndex].quantity += quantity;
        // } else {
        //     cart.items.push({ productId, quantity });
        // }

        await cart.save();
        return cart;
    } catch (error) {
        console.error("Error in addToCart:", error.message);
        throw error;
    }
};

export default { addToCart };
