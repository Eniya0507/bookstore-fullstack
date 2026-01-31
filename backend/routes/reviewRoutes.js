const express = require('express');
const Review = require('../models/Review');
const Book = require('../models/Book');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Add review
router.post('/', protect, async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ user: req.user._id, book: bookId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = await Review.create({
      user: req.user._id,
      book: bookId,
      rating,
      comment
    });

    await review.populate('user', 'name');
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get reviews for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update review
router.put('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { rating, comment } = req.body;
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();
    await review.populate('user', 'name');
    
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete review
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;