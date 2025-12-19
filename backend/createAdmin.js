const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_ATLAS, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB Atlas Connected for admin creation ✅');
  } catch (atlasError) {
    console.log('Atlas connection failed, trying local MongoDB...');
    try {
      await mongoose.connect(process.env.MONGO_URI_LOCAL);
      console.log('Local MongoDB Connected for admin creation ✅');
    } catch (localError) {
      console.error('Both database connections failed:', localError);
      process.exit(1);
    }
  }
};

connectDB();

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@bookstore.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@bookstore.com',
      password: hashedPassword,
      isAdmin: true
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@bookstore.com');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();