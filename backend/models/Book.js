const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // We will store the Image URL
  stock: { type: Number, required: true, default: 0 },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt dates
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;