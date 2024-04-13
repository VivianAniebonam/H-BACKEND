const mongoose = require('mongoose');

const waterLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  dailyAmount: { type: Number, required: true }, // Daily recommended amount of water in milliliters (mls)
  totalAmount: { type: Number, required: true }, // Total recommended amount for the therapy duration
  therapyDuration: { type: Number, required: true }, // Duration of therapy in days
  amountPerHour: { type: Number }, // Calculated amount of water to consume per hour
  sleepTime: { type: Number, required: false }, // Deprecated: Old field, consider removing or repurposing
  sleepStartTime: { type: Date, required: false }, // Timestamp when user goes to sleep
  sleepEndTime: { type: Date, required: false }, // Timestamp when user wakes up
  reminderMode: {
    type: String,
    required: true,
    enum: ['phone', 'email', 'both'],
  },
  napStartTime: { type: String, required: false }, // Format "HH:mm"
  napDuration: { type: Number, required: false }, // Duration of nap in hours
  reminderInterval: { type: Number, required: true, default: 60 }, // Reminder interval in minutes
  lastWaterTime: { type: Date, required: true, default: Date.now }, // Set default to Date.now
  currentAmountConsumed: { type: Number, required: true, default: 0 },
});

// Pre-save hook to calculate amountPerHour excluding sleep time
waterLogSchema.pre('save', function(next) {
  // Assuming sleepStartTime and sleepEndTime are correctly populated
  if (!this.sleepStartTime || !this.sleepEndTime) {
    return next(new Error('Sleep start time and end time are required.'));
  }

  const sleepStartTime = new Date(this.sleepStartTime);
  const sleepEndTime = new Date(this.sleepEndTime);

  // Calculate total sleep time in hours
  let sleepDurationHours = (sleepEndTime - sleepStartTime) / (1000 * 60 * 60);
  if (this.napDuration) {
    sleepDurationHours += this.napDuration;
  }

  // Assume 24 hours in a day minus total sleep and nap time for waking hours
  const wakingHours = 24 - sleepDurationHours;

  if (wakingHours <= 0) {
    return next(new Error('Invalid total sleep and nap duration; waking hours cannot be zero or negative.'));
  }

  // Calculate the amount of water to consume per hour during waking hours
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