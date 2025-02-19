 import express from 'express'
import { addToCartController } from '../controllers/cartController.js';
const router = express.Router()


router.post("/add-to-cart", addToCartController);


export default router;
