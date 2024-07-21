const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Create or Update User
router.post('/sync', authMiddleware, async (req, res) => {
  const { username, email } = req.body;
  const clerkId = req.clerkId;
  
  try {
    let user = await User.findOne({ clerkId });
    if (user) {
      user.username = username;
      user.email = email;
      user = await user.save();
    } else {
      user = new User({ clerkId, username, email });
      user = await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
