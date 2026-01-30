const mongoose = require('mongoose');
const Order = require('./models/Order');
const User = require('./models/User');
require('dotenv').config();

const createTestOrder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find or create a test user
    let testUser = await User.findOne({ email: 'test@test.com' });
    if (!testUser) {
      testUser = await User.create({
        name: 'Test User',
        email: 'test@test.com',
        password: 'hashedpassword',
        isAdmin: false
      });
    }

    // Create test order
    const testOrder = new Order({
      orderItems: [
        {
          title: 'Test Book',
          quantity: 2,
          price: 299,
          image: 'https://via.placeholder.com/150',
          product: new mongoose.Types.ObjectId()
        }
      ],
      user: testUser._id,
      shippingAddress: {
        address: '123 Test Street',
        city: 'Test City',
        postalCode: '12345',
        country: 'India'
      },
      paymentMethod: 'COD',
      totalPrice: 598,
      orderStatus: 'Pending'
    });

    await testOrder.save();
    console.log('Test order created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createTestOrder();