const mongoose = require('mongoose');

const trackWaterDrankSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  waterLogId: {type: mongoose.Schema.Types.ObjectId, ref: 'WaterLog',required: true},
  lastWaterTime: {type: Date,required: true},
  nextWaterTime: {type: Date,required: true},  
  }, 
  {
  timestamps: true 
});

module.exports = mongoose.model('TrackWaterDrank', trackWaterDrankSchema, 'TrackWaterDrank');

// {
//     "userId": "62d1a45e84f14b263de36b8c",
//     "waterLogId": "62d1a4d584f14b263de36b8f",
//     "lastWaterTime": "2024-04-12T08:30:00Z",
//     "nextWaterTime": "2024-04-12T09:30:00Z"
//   }