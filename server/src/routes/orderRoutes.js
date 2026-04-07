import express from 'express';
import { createOrder, getAllOrders, getMyOrders } from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);
router.route('/my').get(protect, getMyOrders);

export default router;
