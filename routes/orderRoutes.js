import express from 'express';
import { isAdmin, isAuth }from "../middlewares/authMiddleware.js";
import { changeOrderStatusController, createOrderController, getAllOrdersController, getMyOrdersController } from '../controllers/orderController.js';
const router = express.Router();
router.post('/create', isAuth, createOrderController);
router.get("/get-myorder", isAuth , getMyOrdersController);
router.get('/admin/get-all-orders', isAuth, isAdmin, getAllOrdersController)
router.put('/admin/order/:id', isAuth, isAdmin, changeOrderStatusController)
export default router;





