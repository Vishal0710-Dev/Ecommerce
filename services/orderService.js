import orderModel from '../models/orderModels.js';
import productModel from '../models/productModels.js';
import mongoose from 'mongoose';


export const createOrder = async (orderData, userId) => {
  const { shippingInfo, orderItems, images } = orderData;

  if (!shippingInfo || !orderItems) {
    throw new Error("Shipping info and order items are required");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (let item of orderItems) {
      const product = await productModel.findById(item.product).session(session);
      if (!product || product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${item.product}`);
      }
      product.stock -= item.quantity;
      await product.save({ session });
    }

    const newOrder = new orderModel({
      user: userId,
      shippingInfo,
      orderItems,
      images,
    });

    const savedOrder = await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    return savedOrder;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


export const getMyOrder = async (userId) => {
    const orders = await orderModel.find({ user: userId });
    if (!orders || orders.length === 0) {
      throw new Error('No orders found');
    }
    return await Order.find().populate("orderItems.product", "name price image");
  
};
export const getAllOrders = async () => {
  const orders = await orderModel.find({});

  return orders.map(order => ({
    ...order._doc,
    images: order.images.map(img => `${process.env.BASE_URL}${img}`),
  }));
};

export const changeOrderStatus = async (orderId) => {
  const order = await orderModel.findById(orderId);
  
  if (!order) {
    const error = new Error("Order not found");
    error.status = 400;
    throw error;
  }

  if (order.orderStatus === "processing") {
    order.orderStatus = "shipped";
  } else if (order.orderStatus === "shipped") {
    order.orderStatus = "delivered";
    order.deliveredAt = Date.now();
  } else {
    const error = new Error("Order already delivered");
    error.status = 400;
    throw error;
  }

  await order.save();
  return "Order status updated successfully";
};
