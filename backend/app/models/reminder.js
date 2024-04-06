const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reminderTime: { type: String, required: true }, // could be in 'HH:MM' format
  message: String, // custom message for the reminder
  isEnabled: { type: Boolean, default: true },
  alertMethod: {
    type: String,
    enum: ['email', 'phone', 'both'], // Specifies allowed methods
    required: true,
  },
});

module.exports = mongoose.model('Reminder', reminderSchema,'Reminders');

/*
{
  "_id": {
    "$oid": "65d182da2ac4d6923022db4e"
  },
  "reminderTime": "08:00",
  "message": "Time to drink water!",
  "isEnabled": true,
  "alertMethod": "email"
}
*/