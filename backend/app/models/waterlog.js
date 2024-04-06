const mongoose = require('mongoose');

const waterLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  dailyAmount: { type: Number, required: true }, // Daily recommended amount of water in milliliters (mls)
  totalAmount: { type: Number, required: true }, // Total recommended amount for the therapy duration
  therapyDuration: { type: Number, required: true }, // Duration of therapy in days
  amountPerHour: { type: Number }, // Calculated amount of water to consume per hour
  sleepTime: { type: Number, required: true }, // User's average sleep time in hours to exclude from hourly calculation
});

// Pre-save hook to calculate amountPerHour excluding sleep time
waterLogSchema.pre('save', function(next) {
  const wakingHours = 12 - this.sleepTime; // 12 hours in a day
  this.amountPerHour = this.dailyAmount / wakingHours;
  next();
});

module.exports = mongoose.model('WaterLog', waterLogSchema,'Waterlogs');


/*
{
  "_id": {
    "$oid": "65d18bad2ac4d6923022db64"
  },
  "date": "2024-02-17T00:00:00Z",
  "dailyAmount": 2500,
  "totalAmount": 15000,
  "therapyDuration": 7,
  "sleepTime": 8
}
*/

//BY JOHN DOE USER
/**
 * {
  "_id": {
    "$oid": "65d233b62ac4d6923022db72"
  },
  "userId": "65d189432ac4d6923022db5b",
  "dailyAmount": 2000,
  "totalAmount": 14000,
  "therapyDuration": 7,
  "sleepTime": 8
}
 */