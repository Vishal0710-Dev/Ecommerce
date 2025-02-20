import mongoose from "mongoose";
import Cart from "../models/cartModels.js";
import productModel from "../models/productModels.js";

const addToCart = async (userId, productId, quantity) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product ID");
    }

    const product = await productModel.findById(productId);
    if (!product) throw new Error("Product not found");

    if (product.stock < quantity) throw new Error("Not enough stock available");

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    //let updatedItem = null;

    //const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    // if (itemIndex > -1) {
    //     cart.items[itemIndex].quantity = quantity;
    //     updatedItem = cart.items[itemIndex];
    // } else {
    //     updatedItem = { productId, quantity };
    //     cart.items.push(updatedItem);
    // }

    await cart.save();

    return {
        userId, 
        productId: updatedItem.productId,
        quantity: updatedItem.quantity
    };
};

export default { addToCart };
