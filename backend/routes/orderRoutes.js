import express from 'express';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getUserOrdersList,
} from '../controllers/orderController.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/user/:id').get(protect, isAdmin, getUserOrdersList);
// * When using :colon based routes make sure they are below their more exact counterparts otherwise they will take over

export default router;
