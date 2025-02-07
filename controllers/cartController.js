import cartService from '../services/cartService.js'
export const addToCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const cart = await cartService.addToCart(userId, productId, quantity);

       //const lastAddedItem = cart.items[cart.items.length - 1];

        return res.status(200).json({ 
            message: "Item added to cart", 
            userId,
            productId,
            quantity
            // productId: lastAddedItem.productId,
            //  quantity: lastAddedItem.quantity
        });

    } catch (error) {
        console.error("Error in addToCartController:", error.message);
        return res.status(500).json({ message: error.message });
    }
};
;

