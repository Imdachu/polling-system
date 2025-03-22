const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  user: { type: String, required: true }, // User identifier (e.g., IP or session ID)
  option: { type: String, required: true }, // The option they voted for
});

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true }, // The poll question
  options: [{ type: String, required: true }], // Array of options
  votes: [voteSchema], // Array of votes
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('Poll', pollSchema);