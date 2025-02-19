import productModel from "../models/productModels.js";

export const addProduct = async (productData) => {
    return await productModel.create(productData);
};

export const getAllProducts = async () => {
    return await productModel.find({});
};

export const updateProduct = async (productId, updateData) => {
    const product = await productModel.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    Object.assign(product, updateData);
    await product.save();

    return product;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}
export const deleteProduct = async (productId) => {
    const product = await productModel.findByIdAndDelete(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};
