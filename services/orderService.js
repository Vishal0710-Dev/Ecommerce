import orderModel from '../models/orderModels.js';

export const createOrder = async (orderData, userId) => {
    const { shippingInfo, orderItems, orderStatus } = orderData;

    if (!shippingInfo || !orderItems || !orderStatus) {
        throw new Error("Please provide all fields");
    }

    return await orderModel.create({
        user: userId,
        shippingInfo,
        orderItems,
        orderStatus
    });
} 

export const getMyOrder = async (userId) => {
  try {
    const orders = await orderModel.find({ user: userId });
    if (!orders || orders.length === 0) {
      throw new Error('No orders found');
    }
    return orders;
  } catch (error) {
    throw error;
  }
};
//admin
export const getAllOrders = async () => {
    try {
        const orders = await orderModel.find({});
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
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
