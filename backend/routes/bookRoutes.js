const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, deleteBook, updateBookStock } = require('../controllers/bookController');

// Define the paths
router.route('/').get(getBooks).post(createBook); // GET all or POST new
router.route('/:id').get(getBookById).delete(deleteBook); // GET one by ID or DELETE
router.route('/:id/stock').put(updateBookStock); // Update stock

module.exports = router;