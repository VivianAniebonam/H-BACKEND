const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // User's first name is still required
  lastName: { type: String, required: false }, // User's last name is now not required
  title: { type: String, required: true },
  content: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
  rating: { type: Number, min: 1, max: 5, required: false }, // Rating is now not required
  isVisible: { type: Boolean, default: true },
});

module.exports = mongoose.model('Testimony', testimonySchema, 'Testimonies');

/*
{
  "_id": {
    "$oid": "65d184782ac4d6923022db50"
  },
  "firstName": "Vivian",
  "lastName": "Aniebonam",
  "title": "Great Experience",
  "content": "Using the hydration tracking app has significantly improved my daily water intake and overall health.",
  "datePosted": {
    "$date": "2024-01-01T00:00:00.000Z"
  },
  "rating": 5,
  "isVisible": true
}
*/