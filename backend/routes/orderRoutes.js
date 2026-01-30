const express = require('express');
const router = express.Router();
const { addOrderItems, getOrders, getOrdersByUser, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getOrders).post(protect, addOrderItems);
router.route('/user/:userId').get(protect, getOrdersByUser);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;