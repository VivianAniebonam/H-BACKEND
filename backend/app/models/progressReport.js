const mongoose = require('mongoose');

const progressReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  dailyGoal: { type: Number, required: true },
  totalGoal: { type: Number, required: true },
  dailyIntakeLogs: [{
    date: Date,
    amountConsumed: Number,
  }],
  completedAlerts: { type: Number, default: 0 }, // Number of alerts acknowledged by the user
  performanceMessage: { type: String }, // Message based on performance
});

// Adding a middleware to calculate and set the performance message
progressReportSchema.methods.setPerformanceMessage = function () {
  // Sum up the total amount consumed from daily intake logs
  const totalConsumed = this.dailyIntakeLogs.reduce((acc, log) => acc + log.amountConsumed, 0);

  // Calculate the hydration completion rate as a percentage of the total goal
  const hydrationCompletionRate = (totalConsumed / this.totalGoal) * 100;

  // Set performance message based on hydration completion rate
if (hydrationCompletionRate >= 100) {
  this.performanceMessage = "Outstanding hydration! You've met or exceeded your goal.";
} else if (hydrationCompletionRate >= 90) {
  this.performanceMessage = "Excellent! You're very close to your hydration goal.";
} else if (hydrationCompletionRate >= 80) {
  this.performanceMessage = "Very good, but there's a little room for improvement.";
} else if (hydrationCompletionRate >= 70) {
  this.performanceMessage = "Good effort! Let's try to get a bit closer to your goal.";
} else if (hydrationCompletionRate >= 60) {
  this.performanceMessage = "You're doing okay, but let's aim for more water intake.";
} else if (hydrationCompletionRate >= 50) {
  this.performanceMessage = "You're halfway to your goal. Keep pushing to drink more!";
} else if (hydrationCompletionRate >= 40) {
  this.performanceMessage = "Below half, but there's still room to catch up. Keep it up!";
} else if (hydrationCompletionRate >= 30) {
  this.performanceMessage = "A decent start, but let's increase our efforts to stay hydrated.";
} else if (hydrationCompletionRate >= 20) {
  this.performanceMessage = "You've made some progress, but there's a lot more to do.";
} else if (hydrationCompletionRate >= 10) {
  this.performanceMessage = "It's a start, but remember to drink much more water.";
} else {
  this.performanceMessage = "Needs significant improvement. Remember, staying hydrated is key to health.";
}
};

// Ensure setPerformanceMessage method is called before saving
progressReportSchema.pre('save', function (next) {
  this.setPerformanceMessage();
  next();
});

module.exports = mongoose.model('ProgressReport', progressReportSchema,'ProgressReports');

/*
{
  "_id": {
    "$oid": "65d1868b2ac4d6923022db55"
  },
  "startDate": {
    "$date": "2024-01-01T09:00:00.000Z"
  },
  "endDate": {
    "$date": "2024-01-07T17:00:00.000Z"
  },
  "dailyGoal": 2000,
  "totalGoal": 14000,
  "dailyIntakeLogs": [
    {
      "date": {
        "$date": "2024-01-01T10:00:00.000Z"
      },
      "amountConsumed": 1500
    },
    {
      "date": {
        "$date": "2024-01-02T11:30:00.000Z"
      },
      "amountConsumed": 1800
    }
  ],
  "completedAlerts": 3,
  "performanceMessage": "Needs improvement, remember to drink more water."
}
*/