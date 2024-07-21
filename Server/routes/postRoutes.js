const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new post
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, code } = req.body;
  const clerkId = req.clerkId;
  
  try {
    const post = new Post({ clerkId, title, description, code });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
