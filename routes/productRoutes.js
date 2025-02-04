import express from 'express';
import { AddProductController, DeleteProductController, getAllProductsController, UpdateProductController} from "../controllers/productController.js";
import { isAdmin, isAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/add-product", isAuth, isAdmin, AddProductController);

router.get("/get-all", getAllProductsController);

router.put("/update-product/:productId", isAuth, isAdmin, UpdateProductController);

router.delete("/delete/:productId", isAuth, isAdmin, DeleteProductController);
export default router;