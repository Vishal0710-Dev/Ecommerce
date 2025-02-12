 import express from 'express'
//import { isAuth } from '../middlewares/authMiddleware.js';
import { addToCartController } from '../controllers/cartController.js';
const router = express.Router()


router.post("/add-to-cart"//, isAuth
,addToCartController);


export default router;
