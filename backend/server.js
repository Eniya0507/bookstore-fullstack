require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to both databases
const connectDB = async () => {
  try {
    // Connect to Atlas
    await mongoose.connect(process.env.MONGO_URI_ATLAS, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB Atlas Connected ✅');
    
    // Also create local connection
    try {
      const localConnection = mongoose.createConnection(process.env.MONGO_URI_LOCAL);
      localConnection.on('connected', () => {
        console.log('Local MongoDB Connected ✅');
      });
      localConnection.on('error', (err) => {
        console.log('Local MongoDB connection failed:', err.message);
      });
    } catch (localError) {
      console.log('Local MongoDB connection failed:', localError.message);
    }
    
  } catch (atlasError) {
    console.log('Atlas connection failed, trying local MongoDB...');
    try {
      await mongoose.connect(process.env.MONGO_URI_LOCAL);
      console.log('Local MongoDB Connected ✅');
    } catch (localError) {
      console.error('Both database connections failed:', localError);
      process.exit(1);
    }
  }
};

connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is running with dual database support...");
});

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
