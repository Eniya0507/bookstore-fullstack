const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 299,
    category: "Fiction",
    description: "A classic American novel about the Jazz Age and the American Dream.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 349,
    category: "Fiction",
    description: "A gripping tale of racial injustice and childhood innocence.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 450,
    category: "Finance",
    description: "Personal finance book that advocates financial literacy and building wealth.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 1200,
    category: "Programming",
    description: "A handbook of agile software craftsmanship and clean coding practices.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=400&fit=crop"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    category: "Self-Help",
    description: "An easy and proven way to build good habits and break bad ones.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop"
  }
];

const fixAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const db = mongoose.connection.db;
    
    // Drop the entire books collection
    try {
      await db.dropCollection('books');
      console.log('Books collection dropped');
    } catch (error) {
      console.log('Collection does not exist, creating new one');
    }

    // Create new collection and insert books
    const booksCollection = db.collection('books');
    await booksCollection.insertMany(books);
    
    console.log(`${books.length} books inserted successfully!`);
    process.exit(0);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixAndSeed();