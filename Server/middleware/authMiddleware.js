const express = require('express');
const router = express.Router();
const { requireSession } = require('@clerk/clerk-sdk-node');

const authMiddleware = requireSession((req, res, next) => {
  const clerkId = req.session.userId;
  if (!clerkId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.clerkId = clerkId;
  next();
});

// Example protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.clerkId });
});

module.exports = authMiddleware;