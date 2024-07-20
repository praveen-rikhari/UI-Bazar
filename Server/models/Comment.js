const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  clerkId: { type: String, required: true }, // Clerk's user ID of the commenter
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
