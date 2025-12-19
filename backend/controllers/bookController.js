const Book = require('../models/Book');

// @desc    Fetch all books
// @route   GET /api/books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch single book
// @route   GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a book (Admin only)
// @route   POST /api/books
const createBook = async (req, res) => {
  const { title, author, price, category, description, image, stock } = req.body;

  try {
    const book = new Book({
      title, author, price, category, description, image, stock: stock || 0
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: "Invalid book data" });
  }
};

// @desc    Update book stock
// @route   PUT /api/books/:id/stock
const updateBookStock = async (req, res) => {
  const { stock } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    
    if (book) {
      book.stock = stock;
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a book (Admin only)
// @route   DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getBooks, getBookById, createBook, deleteBook, updateBookStock };