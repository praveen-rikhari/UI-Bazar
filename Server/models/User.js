const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk's user ID
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  coins: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
