import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId:{
        type:Number,
        required:[true, 'productId required']
    },
    name:{
        type:String,
        required:[true, 'product name is required']
    },
    description:{
        type:String,
        required:[true, 'product description is required']
    },
    price:{
        type:Number,
        required:[true, 'product price is required']
    },
    stock:{
        type:Number,
        required:[true, 'product stock required'],
        min:0

     },
     image:{
        type:String,
        required: false
     }
    
},{timestamps:true});

export const productModel = mongoose.model("Products", productSchema);
export default productModel;