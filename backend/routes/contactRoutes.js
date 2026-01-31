const express = require('express');
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Send contact message (Public - no auth required)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all messages (Admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark message as read (Admin only)
router.put('/:id/read', protect, admin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;