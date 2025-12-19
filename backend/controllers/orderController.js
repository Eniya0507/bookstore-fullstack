const Order = require('../models/Order');
const mongoose = require('mongoose');

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    
    // Set default status for orders that don't have one
    const ordersWithStatus = orders.map(order => {
      if (!order.orderStatus) {
        order.orderStatus = 'Pending';
      }
      return order;
    });
    
    res.json(ordersWithStatus);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get orders by user ID
// @route   GET /api/orders/user/:userId
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create new order
// @route   POST /api/orders
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      user, // Sent from frontend (User ID)
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Validate user ID
    if (!user || !mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Process order items and handle invalid product IDs
    const processedOrderItems = orderItems.map(item => {
      // If product ID is invalid, create a dummy ObjectId
      const productId = mongoose.Types.ObjectId.isValid(item.product) 
        ? item.product 
        : new mongoose.Types.ObjectId();
      
      return {
        ...item,
        product: productId
      };
    });

    const order = new Order({
      orderItems: processedOrderItems,
      user,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
    
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Set default status if it doesn't exist
    if (!order.orderStatus) {
      order.orderStatus = 'Pending';
    }
    
    order.orderStatus = status;
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = { addOrderItems, getOrders, getOrdersByUser, updateOrderStatus };