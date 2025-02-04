import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({

shippingInfo:{

    Address:{
        type:String,
        required:[true, 'address is required']
    },
    City:{
        type:String,
        required:[true, 'city is requird']
    },
    Country:{
        type:String,
        required:[true, 'country is required']
    }
},
orderItems:{
    name:{
        type:String,
        required:[true, 'productname is required']
    },
    price:{
        type:Number,
        required:[true, 'productprice is required']
    },
    quantity:{
        type:Number,
        required:[true, 'product quantity is required']
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
        required:true
    }
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:true
},
orderStatus:{                                                                                                                                                                                                                                                                                           
    type:String,
    enum:['processing', 'shipped', 'delivered'],
    default:'processing'
},
deliveredAt: Date,                                                                                                                                                                                                                            
},{timestamps:true});

export const orderModel = mongoose.model("Orders", orderSchema);
export default orderModel;
