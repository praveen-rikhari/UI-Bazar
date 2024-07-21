const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new comment
router.post('/', authMiddleware, async (req, res) => {
  const { postId, text } = req.body;
  const clerkId = req.clerkId;

  try {
    const comment = new Comment({ clerkId, postId, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
