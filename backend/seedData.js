const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    description: "A classic American novel set in the Jazz Age",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300",
    category: "Fiction",
    stock: 50
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    description: "A gripping tale of racial injustice and childhood innocence",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300",
    category: "Fiction",
    stock: 30
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 13.99,
    description: "A dystopian social science fiction novel",
    image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300",
    category: "Science Fiction",
    stock: 25
  }
];

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Book.deleteMany({});
    await User.deleteMany({});
    
    // Insert books
    await Book.insertMany(books);
    console.log('Books seeded successfully');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@bookstore.com',
      password: hashedPassword,
      isAdmin: true
    });
    await adminUser.save();
    console.log('Admin user created');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();