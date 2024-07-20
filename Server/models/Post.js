const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  clerkId: { type: String, required: true }, // Clerk's user ID of the post creator
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
