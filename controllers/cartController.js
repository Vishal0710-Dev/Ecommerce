import cartService from "../services/cartService.js";
import JWT from "jsonwebtoken";
import userModel from "../models/userModels.js";

export const addToCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let user = null;

        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            try {
                const token = authHeader.split(" ")[1];
                const decodedData = JWT.verify(token, process.env.JWT_SECRET);
                user = await userModel.findById(decodedData._id).select("-password");
            } catch (error) {
                console.log("Invalid token:", error.message);
            }
        }

        if (user) {
            const cartItem = await cartService.addToCart(user._id, productId, quantity);
            return res.status(200).json({ 
                message: "Item added to cart", 
                //userId: cartItem.userId, 
                cartItem 
            });
        }

        if (!req.session) {
            req.session = {};
        }
        if (!req.session.cartItems) {
            req.session.cartItems = [];
        }

        let existingItem = req.session.cartItems.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity = quantity;
        } else {
            req.session.cartItems.push({ productId, quantity });
        }

        return res.status(200).json({
            message: "Item added to guest cart",
            cartItem: { productId, quantity }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
