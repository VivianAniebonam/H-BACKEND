const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  title: { type: String, required: true },
  content: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
  isVisible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Testimony', testimonySchema);
