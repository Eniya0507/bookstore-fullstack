const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
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