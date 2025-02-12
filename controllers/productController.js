import { addProduct, getAllProducts, updateProduct, deleteProduct } from "../services/productService.js";

export const AddProductController = async (req, res) => {
    try {
        //const { productId, name, description, price, stock, image } = req.body;
        const product = await addProduct(req.body);
        res.status(201).json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({ success: true, message: "All products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const UpdateProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await updateProduct(productId, req.body);
        res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const DeleteProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        await deleteProduct(productId);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
