import { changeOrderStatus, createOrder, getAllOrders, getMyOrder } from '../services/orderService.js';
export const createOrderController = async (req, res) => {
  try {
      const { shippingInfo, orderItems,
       //totalAmount, paymentMethod
        } = req.body;
      
      if (!shippingInfo || !orderItems
       // !totalAmount || !paymentMethod
        ) {
          return res.status(400).json({ message: "All fields are required" });
      }
      // const imageUrls = req.files.map(file => `/uploads/orders/${file.filename}`);

      const order = await createOrder(req.body, req.user._id, //imageUrls
      );
      res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

 export const getMyOrdersController = async (req, res) => {
   try {
     const order = await getMyOrder(req.user._id);
     res.status(200).json({ message: 'Your order data', order });
   } catch (error) {
     if (error.message === 'No orders found') {
       return res.status(404).json({ message: error.message });
     }
     res.status(500).json({ message: error.message });
   }
 };

 
//admin routes
export const getAllOrdersController = async (req, res) => {
  try {
      const orders = await getAllOrders();
      res.status(200).json({ message: 'Get all order data', orders });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const changeOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await changeOrderStatus(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
