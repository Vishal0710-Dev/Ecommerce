import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      country: {
        type: String,
        required: [true, 'Country is required'],
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, 'Product name is required'],
        },
        price: {
          type: Number,
          required: [true, 'Product price is required'],
        },
        quantity: {
          type: Number,
          required: [true, 'Product quantity is required'],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products',
          required: true,
        },
      },
    ],
  images: [{ type: String }],
  
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered'],
      default: 'processing',
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

export const orderModel = mongoose.model('Orders', orderSchema);
export default orderModel;
